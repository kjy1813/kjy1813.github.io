---
layout: page
title: 16-bit Processor in Verilog
description: Register file, CLA ALU with F/L/C/N/Z flags, barrel shifter, PSR, PC, instruction register and decoder — verified module by module, then integrated and run on a binary program.
img: assets/img/projects/verilog_lab4_trace.jpg
importance: 3
category: hardware
github: https://github.com/kjy1813/verilog-16bit-processor
---

**Course:** Computer Architecture (2025-2) · **Language:** Verilog HDL · **Simulation:** ModelSim

```
IMEM → IR → Decoder ─┬─ Register File (8 × 16-bit, 2 read ports)
                     ├─ ALU (CLA, ADD/SUB/CMP/AND/OR/XOR) → PSR (F L C N Z)
                     ├─ Barrel shifter (−16 … +15), LUI
                     └─ PC (PC+1 / PC+disp / jump target)
   write-back source selected by TRI_SEL: shifter | ALU | MUX | PC | DMEM
```

Built in four labs: register file → execution unit (carry-lookahead ALU, flags, shifter) → fetch/decode (PC, IR with NOP insertion on a taken jump/branch, decoder with `JAL` / `Jcond` / `Bcond` condition codes) → full integration.

## What was hard

Not any single module. The arithmetic flags, the signed/unsigned interpretation of `ADD`/`SUB`/`CMP`, and the `Jcond`/`Bcond` condition codes all depend on each other, so a module that passes its own test can still break control flow. The approach was to compute the expected result **and** the expected F/L/C/N/Z flags by hand for each test vector first, compare them against the waveform, and only then trace branch decisions and PC updates in the integrated processor.

## Verification

- Module testbenches for the register file, ALU, shifter and fetch/decode stage, checked against hand-computed values.
- Integrated run of a 21-instruction binary program: register initialization, `LUI`/`ORI` immediate construction, a `CMP` + `JNZ` loop that stores through a pointer register and increments it, `JMP` back — observed in the waveform executing in the decoded order.

Details, the decoded program listing, flag test vectors and simulation scripts are in the repository.
