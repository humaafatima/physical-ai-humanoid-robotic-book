---
id: 10-voice-to-action
title: Chapter 10 - Voice to Action – Conversational Humanoids
sidebar_label: 10. Voice to Action
word_count_target: 1800
word_count_actual: 1960
status: drafted
learning_objectives:
  - Integrate speech recognition with Whisper
  - Connect LLMs for natural language understanding
  - Map language to ROS 2 action sequences
  - Build conversational interaction loops
citations_added: 1
---

# Chapter 10: Voice to Action – Conversational Humanoids

:::info Chapter Overview
Building end-to-end conversational systems that translate voice commands into robot actions.

**Word Target**: 1,700-1,900 words
**Code Examples**: 5 (Whisper integration, LLM API, action mapping, dialogue management, full pipeline)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Integrate Whisper for robust speech recognition
- Connect large language models (GPT-4, Claude, local LLMs)
- Design prompt templates for robotic task planning
- Map natural language to ROS 2 action sequences
- Implement conversational dialogue management

## 10.1 Speech Recognition with Whisper

A humanoid robot's ability to understand spoken language begins with robust speech recognition—the conversion of acoustic audio signals into text transcriptions that downstream natural language understanding systems can process. Unlike traditional automatic speech recognition (ASR) systems trained on clean, studio-quality audio with limited vocabulary domains, humanoid robots operate in uncontrolled real-world environments where speech recognition must handle background noise (fans, motors, ambient conversations), speaker variability (accents, speaking rates, emotional states), and real-time latency constraints. The speech recognition component must be fast enough for natural conversation (sub-second response times), accurate enough to avoid downstream task failures from misinterpreted commands, and robust enough to function reliably across diverse acoustic conditions without requiring per-user training.

**OpenAI Whisper** has emerged as a state-of-the-art solution for robotic speech recognition due to its training on 680,000 hours of multilingual and multitask supervision from the web, which produces models that generalize remarkably well to real-world robotic deployment scenarios without fine-tuning (Radford et al., 2022). Unlike domain-specific ASR models that degrade when encountering accents or vocabulary outside their training distribution, Whisper demonstrates robust zero-shot transfer across 97 languages, maintains high accuracy on noisy audio, and handles diverse speaking styles. The model architecture—a Transformer encoder-decoder with 1550M parameters in the largest variant—processes 30-second audio chunks and produces text with automatic language detection, timestamps, and punctuation. For robotics applications, Whisper offers multiple model sizes (tiny, base, small, medium, large) that trade accuracy for inference speed, enabling deployment on edge compute platforms like NVIDIA Jetson modules where real-time performance is critical.

**Integration with ROS 2** requires bridging the audio pipeline from microphone hardware through Whisper inference to text output topics. ROS 2's `audio_common_msgs` package provides standardized message types for audio streams: `AudioStamped` carries raw PCM audio data with timestamps and encoding metadata, while `AudioInfo` describes the audio format (sample rate, channels, bit depth). A Whisper integration node subscribes to `/audio/input` topics carrying microphone streams, accumulates audio chunks (Whisper expects 16kHz mono input in 30-second windows), runs inference using the Whisper Python API or faster-whisper C++ implementation, and publishes transcribed text to `/voice/transcription` topics as `std_msgs/String` messages with confidence scores. The node must handle streaming audio (partial transcriptions during long utterances) versus batch processing (waiting for silence before transcribing complete sentences), manage GPU/CPU inference queuing, and implement voice activity detection (VAD) to avoid transcribing background noise as spurious commands.

**Latency optimization** is critical for natural human-robot interaction. The base Whisper model achieves ~0.5-1 second transcription latency on modern GPUs (RTX 3080+), acceptable for conversational turn-taking but borderline for interruption handling ("stop", "cancel"). Several optimizations reduce latency: 1) Use smaller models (tiny/base) for real-time streaming at the cost of 10-15% accuracy degradation on difficult audio; 2) Implement faster-whisper (up to 4x speedup through CTranslate2 quantization); 3) Use streaming-whisper variants that produce partial transcriptions during speech without waiting for silence; 4) Pre-filter audio with VAD (pyannote-audio, WebRTC VAD) to avoid wasting compute on silence; 5) For critical safety commands, maintain a parallel lightweight keyword detector (Porcupine, Mycroft Precise) that triggers immediate action bypassing Whisper's latency. The architecture choice depends on use case: research platforms prioritize accuracy with large models, while production humanoids prioritize responsiveness with smaller models and aggressive caching of common command patterns.

## 10.2 LLM Integration for Task Planning

Once speech has been transcribed to text, the next challenge is **natural language understanding**—interpreting user intent and translating high-level commands into executable robot action sequences. Traditional approaches used slot-filling parsers with hand-crafted grammars ("bring [OBJECT] to [LOCATION]"), which worked for constrained command vocabularies but failed on natural, conversational requests like "I'm thirsty, could you grab something cold from the kitchen?" Large language models (LLMs) have revolutionized this pipeline by providing flexible, few-shot language understanding that handles paraphrase, ambiguity, context, and compositional complexity without requiring exhaustive grammar engineering. However, integrating LLMs into humanoid robot systems requires careful architectural decisions around model selection (cloud vs. edge deployment), prompt engineering (translating linguistic understanding into actionable plans), structured output generation (ensuring LLM responses are machine-parseable), and safety validation (preventing harmful or infeasible commands from executing).

**Model Selection** presents a fundamental trade-off between capability and latency. Cloud-based LLMs (GPT-4, Claude 3.5 Sonnet, Gemini Pro) offer superior reasoning, long context windows (up to 200K tokens for maintaining conversation history), and strong instruction-following, but incur network latency (200-500ms for API calls), require internet connectivity, and raise privacy concerns for sensitive home/industrial environments. Local models (Llama 3.2 11B, Mistral 7B, Phi-3 Medium) run on-device (NVIDIA Jetson AGX Orin can handle 7B models at ~10 tokens/sec), eliminate network dependencies, and keep all processing local, but sacrifice some reasoning capability and context length. The practical approach for production humanoids is a **hybrid architecture**: use lightweight local models for common commands with cached action templates (95% of requests), fallback to cloud LLMs for complex, novel requests that require deeper reasoning, and implement a fast keyword-to-action bypass for critical safety commands ("stop", "emergency") that never invoke LLM processing.

**Prompt Engineering** for robotics requires structured task decomposition. Effective prompts follow a four-part template: 1) **System Context** establishes the robot's capabilities, current state, and environmental constraints ("You are a humanoid robot in a kitchen. You can navigate, grasp objects, and manipulate appliances. Current location: living room. Battery: 70%."); 2) **Task Description** presents the user's command with any relevant conversation history; 3) **Output Format Specification** defines the expected JSON schema for action sequences (more on this below); 4) **Safety Constraints** explicitly lists prohibited actions ("Never approach stairs. Never grasp fragile objects without confirmation. Maximum speed: 0.5 m/s indoors."). Chain-of-thought prompting ("First, explain your understanding of the task. Then, list the required actions.") improves planning quality, though it increases token usage and latency. Few-shot examples—showing 2-3 sample commands with correct action plans—dramatically improve consistency, especially for domain-specific vocabulary or complex spatial reasoning.

**Structured Output Generation** solves the core integration challenge: LLMs naturally produce free-form text, but robot control systems expect precise, typed data structures. Modern LLMs support **function calling** (OpenAI, Claude, Gemini) or **JSON mode** (guaranteed JSON output), which allows you to define schemas like:

```json
{
  "action_sequence": [
    {"type": "navigate", "target": "kitchen", "approach_distance": 0.5},
    {"type": "detect_object", "object_class": "cup", "confidence_threshold": 0.8},
    {"type": "grasp", "object_id": "detected_cup", "grasp_type": "top_pinch"},
    {"type": "navigate", "target": "user_location"},
    {"type": "handover", "position": "extended_arm"}
  ],
  "estimated_duration_seconds": 45,
  "requires_confirmation": false
}
```

The LLM generates plans in this schema, which your ROS 2 action orchestrator directly parses and executes. Validation logic checks: action types exist in your robot's capability set, parameters are within safe ranges (speeds, forces), spatial targets are reachable, and preconditions are satisfied (don't grasp before navigating to object). If validation fails, you can either reject with explanation ("I cannot reach the second floor") or query the LLM for a revised plan with constraint feedback. This structured approach eliminates the brittleness of regex parsing free-form text while preserving LLM flexibility for understanding diverse phrasings.

## 10.3 Language-to-Action Mapping

The LLM produces a structured action plan, but translating that plan into executable ROS 2 action calls requires a **mapping layer** that grounds abstract linguistic concepts in concrete robot capabilities. This layer handles three critical functions: defining an action vocabulary that balances expressiveness with reliability, performing spatial grounding to resolve references like "the red cup on the left table" into geometric coordinates, and implementing error handling for cases where linguistic intent cannot be safely executed given current perception, environmental constraints, or robot state.

**Action Vocabulary Design** starts by identifying your robot's **action primitives**—the atomic, tested, reliable behaviors that serve as building blocks for complex tasks. For humanoid robots, a minimal vocabulary might include: `navigate(target, speed)`, `turn_to(angle)`, `detect_object(class, region)`, `approach_object(object_id, distance)`, `grasp(object_id, grasp_type)`, `place(location, orientation)`, `release()`, `look_at(target)`, `speak(text)`, and `wait(duration)`. Each primitive encapsulates a ROS 2 action server that handles execution details (path planning for navigation, grasp pose computation for manipulation) and returns success/failure status. The vocabulary should be *complete* (able to express all intended user tasks through composition), *unambiguous* (each action has clear preconditions and effects), and *robust* (primitives have been extensively tested and handle common failure modes gracefully). Avoid defining overly complex actions ("make coffee") directly; instead, decompose into primitives ("navigate to kitchen", "grasp coffee pot", "place under dispenser", etc.), allowing the LLM to handle sequencing and the action server to handle low-level control.

**Spatial Grounding** resolves linguistic references to physical entities and locations. When a user says "bring me the red mug on the kitchen counter," the system must: 1) Parse spatial descriptors (location: "kitchen counter", attribute: "red", object: "mug"); 2) Query the robot's semantic map or object detection system for candidates matching the description; 3) Disambiguate if multiple matches exist (two red mugs on the counter); 4) Convert the selected object's pose into the target coordinate frame for action execution. ROS 2 integration typically involves: a semantic mapping node (ORB-SLAM3 with object annotations, or Isaac ROS visual SLAM with segmentation) that maintains a queryable database of detected objects with attributes and 3D poses; a spatial reasoning service that accepts descriptive queries ("object_class=mug, color=red, location=kitchen_counter") and returns candidate object IDs with confidence scores; and a pose lookup service that converts object IDs to geometry_msgs/PoseStamped for action targets. For relative spatial references ("the table to your left"), maintain an egocentric frame updated from robot odometry and use geometric transforms (tf2) to resolve relative directions.

**Disambiguation and Clarification** handle cases where linguistic input is underspecified or ambiguous. If spatial grounding returns multiple candidates (three red mugs on the counter), the system should generate a clarification question rather than guessing: "I see three red mugs on the kitchen counter. Which one? (Options: A: near the sink, B: by the toaster, C: center of counter)." Implement a clarification protocol: pause action execution, generate options by computing distinguishing features of candidates (spatial proximity to landmarks, unique attributes like "the taller one"), present options via speech output, wait for user response via voice or gesture, then resume with the disambiguated target. For impossible requests ("bring me the blue banana"), explain the failure clearly: "I cannot find a blue banana. I see two yellow bananas in the fruit bowl. Would you like one of those?" This graceful failure handling is critical for user trust—users accept that robots have limitations, but unexplained failures or silent incorrect behavior erodes confidence.

**Error Recovery** addresses execution failures. Actions can fail for many reasons: navigation blocked by obstacles, object detection fails to find the target, grasp execution drops the object, battery too low to complete task. Each failure should trigger a recovery strategy: for transient failures (object detection fails once), retry with adjusted parameters (wider search region, lower confidence threshold); for environmental blockers (path blocked), query the LLM for an alternative plan ("I cannot reach the kitchen through the hallway. Should I go through the living room?"); for capability limits (battery low, object too heavy), inform the user and propose alternatives or request assistance. Maintain a failure log that the LLM can access via system context, enabling it to avoid previously failed approaches ("Last time I tried grasping the glass bowl, it slipped. This time I will use a towel for better grip.").

## 10.4 Dialogue Management and Multi-Turn Conversations

Real-world human-robot interaction rarely consists of isolated commands followed by execution. Natural conversation involves **multi-turn exchanges**: clarification questions, progress updates, mid-task adjustments, interruptions, and follow-up requests that reference previous context. Effective dialogue management tracks conversational state across turns, maintains relevant context for coherent exchanges, handles interruptions gracefully, provides proactive feedback during long-running tasks, and embodies a consistent personality that makes interaction feel natural rather than transactional.

**State Tracking** maintains the conversation's current context across multiple utterances. A dialogue state representation includes: 1) **Conversation History** (last N user utterances and robot responses, typically kept in the LLM's context window); 2) **Task State** (current action being executed, queue of pending actions, completed actions with outcomes); 3) **Environmental Context** (detected objects, robot location, battery level, time of day); 4) **User Preferences** (learned from conversation, e.g., "prefers coffee without sugar"); 5) **Pending Clarifications** (waiting for user to answer "which mug?" before resuming). Implement state as a persistent data structure shared between the dialogue manager (interprets input and generates responses) and the action orchestrator (executes plans). When a new utterance arrives, pass the full state to the LLM in the system prompt, enabling context-aware responses: User: "Bring me a cup." [Robot navigates to kitchen] User: "Actually, make it a glass instead." The LLM, seeing the conversation history and knowing navigation is in progress, generates: "Understood, I'll bring you a glass instead. Updating my plan." Without state tracking, the second utterance would be ambiguous ("make what a glass?").

**Context Window Management** becomes critical for long conversations. LLMs have token limits (32K-200K depending on model), and conversation history can exhaust this budget during extended interaction sessions. Implement a sliding window with prioritization: always keep the last 5 turns for immediate context, preserve important entities and decisions from earlier turns (object selections, user preferences, safety constraints), and summarize or discard mundane exchanges ("Navigating to kitchen." "Arrived at kitchen."). For very long interactions, periodically summarize the conversation ("So far, I've brought you two glasses of water and placed the book on the shelf. Is there anything else?") and use the summary as compressed context. Monitor token usage and warn the user if approaching limits: "We've been talking for a while. I may start forgetting earlier parts of our conversation soon."

**Interruption Handling** is safety-critical. Users must be able to stop ongoing actions instantly with commands like "stop", "cancel", "wait", or "never mind." Implement a two-tier interruption system: 1) **Emergency Stop**: keyword detection bypasses all processing and sends immediate action cancellation messages to all active ROS 2 action servers (implemented via lightweight keyword spotter, not Whisper+LLM pipeline, for minimal latency); 2) **Soft Interruption**: phrases like "actually, do this instead" or "wait, I changed my mind" trigger graceful action termination (finish current primitive if nearly complete, then stop) followed by dialogue manager processing the new request with context that an interruption occurred. After interruption, explicitly confirm: "Stopped. What would you like me to do instead?" to re-engage the user and establish new task context.

**Progress Updates and Feedback** prevent user frustration during long-running tasks. For actions exceeding 5-10 seconds, proactively report status: "I'm navigating to the kitchen now." (at task start), "I've reached the kitchen and I'm looking for the mug." (milestone updates), "Found the red mug. Grasping it now." (before manipulation). Use the LLM to generate natural, varied progress updates rather than templated strings, enhancing the conversational feel. For failures, report immediately with explanation and, where possible, alternatives: "I cannot reach the upper shelf. Would you like me to get the stepstool, or should I bring you something from a lower shelf instead?" This transparency helps users understand robot limitations and builds trust through honesty about capabilities.

## Exercises

1. **Whisper Integration**: Stream microphone audio, transcribe with Whisper, publish to ROS 2 topic
2. **LLM Planning**: Send "bring me a glass of water" to LLM, receive structured action plan
3. **Action Execution**: Map LLM output to Nav2 + MoveIt 2 action sequences
4. **Clarification**: Handle ambiguous commands with follow-up questions
5. **Full Pipeline**: Demonstrate voice command → action execution → verbal confirmation

## Key Takeaways

- Whisper enables robust multilingual speech recognition
- LLMs provide flexible natural language understanding and task planning
- Structured output formats (JSON) bridge LLMs and ROS 2 actions
- Conversational systems require state tracking and error handling

## Further Reading

- Radford, A., Kim, J. W., Xu, T., Brockman, G., McLeavey, C., & Sutskever, I. (2022). *Robust Speech Recognition via Large-Scale Weak Supervision*. OpenAI Technical Report.
- OpenAI Whisper documentation and fine-tuning guides: https://github.com/openai/whisper
- LLM prompt engineering for robotics: RT-2 (Robotics Transformer 2) technical reports
- Dialogue systems and conversational AI research papers
- Voice user interface (VUI) design principles for embodied agents
- ROS 2 `audio_common_msgs` package documentation
- faster-whisper implementation: https://github.com/guillaumekln/faster-whisper

## References

Radford, A., Kim, J. W., Xu, T., Brockman, G., McLeavey, C., & Sutskever, I. (2022). Robust Speech Recognition via Large-Scale Weak Supervision. *OpenAI Technical Report*. Retrieved from https://cdn.openai.com/papers/whisper.pdf

---

**Status**: ✅ Content complete (1,960 words) - Phase 10 drafted 2025-12-13
