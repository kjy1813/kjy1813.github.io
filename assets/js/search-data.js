// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "Coursework projects across MCU, NPU, processor design and sensor data analysis. Each card links to its GitHub repository.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "GitHub profile and the repositories behind the projects page.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "projects-tflite-micro-latency-optimization",
          title: 'TFLite Micro Latency Optimization',
          description: "Arduino Nano 33 BLE · TensorFlow Lite Micro runtime profiling and fixed-shape kernel optimization — 239.60 ms → 95.17 ms with 100% accuracy, model unchanged.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_tflite_micro_latency/";
            },},{id: "projects-on-device-plant-disease-detection",
          title: 'On-device Plant Disease Detection',
          description: "AMB82-mini · camera → 0.4 TOPS NPU inference → LED/Serial. Hand-built TensorFlow CNN deployed as an .nb model; 17 of 20 unseen images classified correctly (85%).",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_amb82_plant_disease/";
            },},{id: "projects-16-bit-processor-in-verilog",
          title: '16-bit Processor in Verilog',
          description: "Register file, CLA ALU with F/L/C/N/Z flags, barrel shifter, PSR, PC, instruction register and decoder — verified module by module, then integrated and run on a binary program.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_verilog_16bit_processor/";
            },},{id: "projects-tinyml-wrist-sensor-activity-recognition",
          title: 'TinyML Wrist-Sensor Activity Recognition',
          description: "Resource-aware HAR on the HTAD wrist dataset — leave-one-subject-out evaluation, handcrafted vs. tiny deep models, full-int8 TFLite (8,920 B) and a sampling-rate ablation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_tinyml_wrist_har/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/kjy1813", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
