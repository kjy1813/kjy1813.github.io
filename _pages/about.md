---
layout: about
title: about
permalink: /
subtitle: Embedded / System Software

selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: false
---

I focus on how software actually executes on hardware: MCU and NPU deployment, runtime profiling, RTL-level datapath design, and system-level validation with measured results.

The [projects](/projects/) page collects four coursework projects, each backed by a public repository:

- **TFLite Micro latency optimization** on Arduino Nano 33 BLE. Inference latency of a fixed MNIST model from 239.60 ms to 95.17 ms with the model unchanged and accuracy kept at 30/30.
- **On-device plant disease detection** on the AMB82-mini NPU. Camera to LED with no server, 17 of 20 unseen images classified correctly.
- **16-bit processor in Verilog.** Register file, CLA ALU with status flags, shifter, PSR, PC and decoder, verified module by module and then as a whole on a binary program.
- **TinyML wrist-sensor activity recognition.** Leave-one-subject-out evaluation, handcrafted versus tiny deep models, full-int8 TFLite at 8,920 bytes.

Source code, benchmark methodology, and validation logs live in the repositories linked from each project.
