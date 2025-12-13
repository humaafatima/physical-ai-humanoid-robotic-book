---
id: 06-sensors
title: Chapter 6 - Perception – Sensors for Humanoid Robots
sidebar_label: 6. Sensors
word_count_target: 1600
word_count_actual: 1680
status: drafted
learning_objectives:
  - Understand sensor modalities for humanoid perception
  - Process RGB-D camera data with ROS 2
  - Integrate IMU and force-torque sensors
  - Implement sensor fusion techniques
---

# Chapter 6: Perception – Sensors for Humanoid Robots

:::info Chapter Overview
Deep dive into sensor systems for humanoid robot perception, from cameras to proprioceptive sensors.

**Word Target**: 1,500-1,700 words
**Code Examples**: 4 (RGB-D processing, IMU integration, sensor fusion, point cloud processing)
:::

## Learning Objectives

By the end of this chapter, you will be able to:

- Select appropriate sensors for humanoid perception tasks
- Process RGB-D camera streams in ROS 2
- Integrate IMU data for balance and orientation tracking
- Implement basic sensor fusion for robust state estimation
- Work with point clouds for 3D environment understanding

## 6.1 Sensor Modalities for Humanoids

Humanoid robots require diverse sensor modalities to perceive and interact with complex, unstructured environments. Unlike industrial robots operating in controlled settings, humanoids must handle variation, occlusion, dynamic obstacles, and unpredictable human interactions—demanding multimodal sensing strategies that combine complementary information sources. Effective sensor selection balances capability against practical constraints like cost, weight, power consumption, and computational requirements.

**Vision sensors** provide rich environmental information. RGB cameras capture appearance and enable color-based segmentation, facial recognition, and visual servoing. Depth cameras (stereo or structured-light/time-of-flight types like Intel RealSense or Microsoft Azure Kinect) add per-pixel distance information, enabling 3D object localization and obstacle detection without requiring stereo processing. Stereo camera pairs offer passive depth perception but require calibration and struggle in textureless regions. Event cameras (dynamic vision sensors) respond to per-pixel intensity changes with microsecond latency, enabling high-speed reactive behaviors like catching or balancing, though their asynchronous output requires specialized processing. For humanoids, head-mounted RGB-D cameras are standard: they provide 3D scene understanding for navigation and manipulation while mimicking human eye placement (Frontiers in Robotics and AI, 2025).

**Proprioceptive sensors** measure the robot's own state rather than the external world. IMUs (Inertial Measurement Units) combine accelerometers measuring linear acceleration, gyroscopes measuring angular velocity, and sometimes magnetometers for heading. Mounted in the torso, IMUs provide orientation estimates critical for balance control—a humanoid needs to know if it's tipping forward before it can react. Joint encoders (absolute or incremental) report angular positions for each actuated joint, enabling forward kinematics to compute link positions and close control loops. Force-torque sensors at wrists or ankles measure interaction forces: wrist sensors enable compliant manipulation (adjusting grasp force, detecting contact), while ankle sensors support zero-moment point estimation for dynamic walking stability.

**Tactile and contact sensors** enable touch-based interaction. Binary contact switches detect simple touch/no-touch states (foot contact with ground, hand contact with object). Resistive or capacitive pressure sensor arrays provide spatial force distributions—essential for dexterous manipulation where the robot must sense grasp quality and slippage. Some research platforms incorporate artificial skin with distributed tactile sensing, though this remains expensive and computationally intensive for whole-body coverage. Practical humanoid designs often compromise: dense tactile sensing in hands for manipulation, simpler contact sensors in feet for locomotion, and vision-based proximity sensing elsewhere to reduce sensor complexity.

**Sensor selection involves trade-offs** that shape robot capabilities and costs. High-resolution depth cameras provide detailed 3D information but generate massive data streams requiring GPU processing. IMUs are cheap ($10-100) and low-power but drift over time without correction. Force-torque sensors enable compliant interaction but add mechanical complexity and cost ($500-5000 per sensor). The selection depends on tasks: a humanoid designed for household manipulation prioritizes wrist force sensing and hand tactile arrays; one for outdoor navigation might emphasize LiDAR and GPS. Understanding these trade-offs allows you to design sensor suites that provide necessary perception capabilities within budget and computational constraints.

## 6.2 RGB-D Camera Processing

RGB-D cameras combine color imagery with per-pixel depth measurements, providing 3D scene understanding from a single sensor. Popular models like the Intel Real Sense D435, Microsoft Azure Kinect, and OAK-D cameras use different depth sensing technologies—stereo vision, time-of-flight, or structured light—but all output aligned RGB and depth images that ROS 2 nodes can process for navigation, manipulation, and perception tasks.

**ROS 2 camera drivers** abstract hardware differences behind standard interfaces. The `realsense2_camera` ROS 2 package publishes topics like `/camera/color/image_raw` (RGB image), `/camera/depth/image_rect_raw` (depth image), and `/camera/color/camera_info` (calibration parameters). These use standard message types: `sensor_msgs/Image` for image data and `sensor_msgs/CameraInfo` for intrinsic calibration matrices. This standardization means perception code written for RealSense cameras works with other RGB-D sensors after simply remapping topic names—a powerful benefit of the ROS ecosystem. Camera drivers expose parameters (frame rate, resolution, depth range) that you can configure via launch files to balance data quality against computational load.

**Depth image alignment and filtering** address practical sensing challenges. Raw depth cameras often have different resolutions or fields of view for RGB and depth sensors, requiring geometric alignment to match depth pixels to color pixels. ROS 2 drivers typically provide pre-aligned topics (e.g., `/camera/aligned_depth_to_color/image_raw`) that handle this automatically. Depth data also contains noise—invalid measurements from reflective surfaces, transparent objects, or range limits show up as NaN or zero values. Filtering strategies include temporal averaging (smoothing depth over multiple frames), spatial median filtering (replacing outliers with neighborhood medians), and bilateral filtering (edge-preserving smoothing). The `depth_image_proc` ROS 2 package provides these filters as nodes that subscribe to raw depth images and publish cleaned outputs.

**Point cloud generation and visualization** converts 2D depth images into 3D point clouds—sets of (x,y,z) points in camera space representing observed surfaces. The conversion uses camera intrinsics (focal length, principal point) to project each depth pixel into 3D: given depth d at pixel (u,v), the 3D point is `x = (u - cx) * d / fx`, `y = (v - cy) * d / fy`, `z = d`, where (cx, cy) is the principal point and (fx, fy) are focal lengths. ROS 2's `depth_image_proc` package provides `point_cloud_xyz_rgb` nodes that perform this conversion, publishing `sensor_msgs/PointCloud2` messages. RViz can visualize these point clouds in real-time, displaying 3D scene geometry with RGB coloring—invaluable for debugging perception pipelines and understanding what the robot "sees."

For humanoid manipulation, RGB-D cameras enable key capabilities: detecting object positions in 3D for grasp planning, building occupancy maps for collision avoidance, and tracking human poses for interaction. The combination of appearance (RGB) and geometry (depth) provides richer information than either modality alone, enabling robust perception in the varied environments humanoids must navigate.

## 6.3 IMU and Proprioceptive Sensing

While cameras tell humanoids about the external world, proprioceptive sensors provide critical self-awareness—knowledge of body orientation, joint positions, and interaction forces. These internal sensors enable balance control, kinematic state estimation, and compliant manipulation behaviors that distinguish capable humanoid platforms from rigid industrial robots.

**IMU fundamentals** start with understanding the sensor components. Accelerometers measure linear acceleration along three axes—but they cannot distinguish gravitational acceleration from motion, so a stationary IMU reports 9.8 m/s² in the vertical axis. Gyroscopes measure angular velocity (rotation rate) around three axes with high accuracy but drift over time—integrating gyro readings to estimate orientation accumulates errors. Magnetometers measure magnetic field strength, providing absolute heading reference (like a compass) but suffer from local magnetic disturbances. Modern IMUs like the Bosch BNO055 or InvenSense ICM-20948 integrate all three sensors on a single chip with onboard sensor fusion that outputs orientation estimates, though understanding the raw sensor principles helps debug unexpected behaviors.

**Orientation estimation and quaternions** solve the challenge of representing 3D rotations without singularities. Euler angles (roll, pitch, yaw) suffer from gimbal lock—configurations where a degree of freedom is lost. Quaternions—four-dimensional unit vectors (w, x, y, z)—represent rotations uniquely and interpolate smoothly without singularities. ROS 2 uses quaternions extensively: `sensor_msgs/Imu` messages include an orientation field as a quaternion, and the tf2 library provides utilities for quaternion manipulation. For humanoid balance control, the IMU-derived orientation quaternion gets converted to roll and pitch angles—if the torso tilts beyond safe thresholds (±5°), the balance controller must generate corrective ankle torques to prevent falling. Understanding quaternion basics (multiplication for composition, conjugate for inverse) enables working with orientation data effectively.

**Joint encoder data** provides kinematic state—the configuration of all robot joints. Each actuated joint publishes its angular position (and often velocity) via `sensor_msgs/JointState` messages on the `/joint_states` topic. The `robot_state_publisher` node subscribes to these messages, computes forward kinematics using the robot's URDF, and broadcasts transforms for every link via tf2. This transform tree enables any node to query "where is the robot's left hand?" and get an answer in real-time based on current joint angles. For manipulation tasks, accurate joint state is essential—if your encoder reports the elbow is at 90° but it's actually at 85°, inverse kinematics will compute incorrect joint commands, and the hand will miss its target.

**Force-torque sensors** measure interaction forces, typically mounted at wrists (6-axis force/torque) or ankles (6-axis or simpler 3-axis force). These sensors enable compliant control: a humanoid hand can adjust grasp force to avoid crushing delicate objects, or detect slippage and increase grip. For bipedal locomotion, foot force sensors measure ground reaction forces used in zero-moment point (ZMP) controllers that ensure dynamic stability. The ROS 2 `geometry_msgs/WrenchStamped` message type carries force-torque data: three force components (Fx, Fy, Fz) and three torque components (Tx, Ty, Tz). Processing force sensor data requires filtering—raw measurements are noisy—and calibration to zero out sensor bias and compensate for gravity acting on the sensor mass.

## 6.4 Sensor Fusion and State Estimation

Individual sensors provide incomplete or noisy information: IMUs drift, cameras suffer from occlusion, encoders can slip. Sensor fusion combines multiple sensor streams to produce more accurate, robust state estimates than any single sensor could provide. For humanoid robots operating in dynamic environments, effective sensor fusion is not optional—it's essential for reliable perception and control.

**Extended Kalman Filter (EKF)** forms the mathematical foundation for most robot sensor fusion. The EKF maintains a probabilistic estimate of robot state (position, velocity, orientation) and its uncertainty (covariance). It operates in two phases: prediction (using a motion model to estimate how state evolves) and update (incorporating new sensor measurements to refine the estimate). The elegance of the EKF is how it weights sensor contributions by their uncertainty—a precise sensor (accurate joint encoders) influences the estimate more than a noisy one (drift-prone IMU). The "extended" in EKF refers to linearization of nonlinear dynamics and measurement models, necessary because robot motion and sensors rarely follow simple linear relationships.

**ROS 2's robot_localization package** provides production-ready EKF implementation specifically designed for mobile robots. The `ekf_node` subscribes to multiple sensor topics (`sensor_msgs/Imu`, `nav_msgs/Odometry`, `geometry_msgs/PoseWithCovarianceStamped`) and publishes a fused odometry estimate. Configuration via YAML specifies which sensors provide which state variables: IMU supplies orientation and angular velocity, wheel odometry provides linear velocity, visual odometry contributes position estimates. The package handles coordinate frame transformations, publishes the fused estimate to tf2, and exposes parameters for tuning process noise (how much we trust the motion model) and measurement noise (how much we trust each sensor). For humanoids without wheels, configuration typically fuses IMU orientation with vision-based position estimates and joint-encoder-derived velocities.

**Combining visual and inertial data** addresses complementary sensor weaknesses. IMUs provide high-frequency orientation updates (100-1000 Hz) with no dependence on environment features but drift unboundedly. Cameras provide absolute position measurements (via visual odometry or SLAM) but at lower frequency (10-30 Hz) and fail in featureless or dark environments. Visual-inertial fusion tracks position using camera data while IMU fills gaps between frames and provides orientation during visual tracking failures. The EKF weighs these contributions: during normal operation, vision dominates position estimates while IMU provides orientation; when visual tracking fails, IMU continues providing orientation (though position uncertainty grows) until vision recovers.

**Handling sensor noise and outliers** prevents bad data from corrupting state estimates. Outliers—spurious measurements like a depth camera reading bouncing off a mirror—can severely distort EKF estimates if treated as valid. Outlier rejection strategies include measurement validation gates (reject measurements more than N standard deviations from predicted values), RANSAC-style robust estimation (find the consistent measurement subset), and adaptive noise scaling (temporarily increase sensor noise covariance when measurements seem unreliable). The `robot_localization` package includes outlier rejection, though tuning thresholds requires understanding your sensors' failure modes—depth cameras produce specific error patterns (NaN at range limits, outliers on reflective surfaces) different from IMU errors (slowly growing drift).

## Exercises

1. **RGB-D Visualization**: Stream Intel RealSense data in RViz and visualize point clouds
2. **IMU Calibration**: Calibrate IMU sensor and implement orientation estimation
3. **Sensor Fusion**: Integrate RGB-D and IMU data using `robot_localization` package
4. **Object Detection**: Use RGB-D data to detect and localize objects in 3D space
5. **Sensor Comparison**: Compare latency and accuracy of different depth sensing technologies

## Key Takeaways

- Multimodal sensing is essential for robust humanoid perception
- RGB-D cameras provide rich 3D information at low cost
- IMU data is critical for balance and orientation tracking
- Sensor fusion improves robustness against individual sensor failures

## Further Reading

- ROS 2 sensor drivers and interfaces
- Kalman filtering for robotics applications
- Vision-based localization and SLAM
- Tactile sensing research for humanoid manipulation

---

**Status**: Outline complete, content authoring pending Phase 6
