/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // Main tutorial sidebar for the book
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Welcome',
    },
    {
      type: 'doc',
      id: '01-intro',
      label: '1. Physical AI & Embodied Intelligence',
    },
    {
      type: 'doc',
      id: '02-landscape',
      label: '2. Humanoid Robotics Landscape',
    },
    {
      type: 'doc',
      id: '03-ros2',
      label: '3. ROS 2 - The Robotic Nervous System',
    },
    {
      type: 'doc',
      id: '04-urdf',
      label: '4. URDF & Robot Modeling',
    },
    {
      type: 'doc',
      id: '05-digital-twins',
      label: '5. Digital Twins',
    },
    {
      type: 'doc',
      id: '06-sensors',
      label: '6. Sensors & Integration',
    },
    {
      type: 'doc',
      id: '07-isaac-ros',
      label: '7. NVIDIA Isaac ROS',
    },
    {
      type: 'doc',
      id: '08-navigation',
      label: '8. Navigation & Bipedal Locomotion',
    },
    {
      type: 'doc',
      id: '09-vla-models',
      label: '9. Vision-Language-Action Models',
    },
    {
      type: 'doc',
      id: '10-voice-to-action',
      label: '10. Voice to Action',
    },
    {
      type: 'doc',
      id: '11-manipulation',
      label: '11. Manipulation & Dexterous Grasping',
    },
    {
      type: 'doc',
      id: '12-sim-to-real',
      label: '12. Sim-to-Real Transfer',
    },
    {
      type: 'doc',
      id: '13-capstone',
      label: '13. Capstone Project',
    },
    {
      type: 'doc',
      id: '14-hardware',
      label: '14. Hardware Guide',
    },
    {
      type: 'doc',
      id: 'glossary',
      label: 'Glossary',
    },
  ],
};

export default sidebars;
