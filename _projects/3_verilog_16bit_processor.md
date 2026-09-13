---
layout: page
title: 16-bit Processor in Verilog
description: Register file, CLA ALU with F/L/C/N/Z flags, barrel shifter, PSR, PC, instruction register and decoder — verified module by module, then integrated and run on a binary program.
img: assets/img/projects/verilog_lab4_trace.jpg
importance: 3
category: hardware
github: https://github.com/kjy1813/verilog-16bit-processor
---

**Course:** Computer Architecture (2025-2) · **Language:** Verilog HDL · **Simulation:** ModelSim (coursework), re-verified with Icarus Verilog during publication

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

Details, the decoded program listing, flag test vectors, simulation scripts and the Icarus Verilog rerun logs are in the repository.

---

## 한국어

**과목:** 컴퓨터구조 (2025-2) · **언어:** Verilog HDL · **시뮬레이션:** ModelSim (수업), 공개 시 Icarus Verilog로 재검증

```
IMEM → IR → Decoder ─┬─ Register File (8 × 16-bit, read port 2개)
                     ├─ ALU (CLA, ADD/SUB/CMP/AND/OR/XOR) → PSR (F L C N Z)
                     ├─ Barrel shifter (−16 … +15), LUI
                     └─ PC (PC+1 / PC+disp / jump target)
   write-back source는 TRI_SEL로 선택: shifter | ALU | MUX | PC | DMEM
```

네 개의 lab으로 만들었다. register file → 실행부(carry-lookahead ALU, flag, shifter) → fetch/decode(PC, jump/branch 성립 시 NOP을 넣는 IR, `JAL` / `Jcond` / `Bcond` 조건 코드를 해석하는 decoder) → 전체 통합.

### 어려웠던 점

특정 모듈 하나가 아니었다. 산술 flag, `ADD`/`SUB`/`CMP`의 signed/unsigned 해석, `Jcond`/`Bcond` 조건 코드가 서로 얽혀 있어서 단위 테스트를 통과한 모듈도 제어 흐름을 깨뜨릴 수 있었다. 그래서 각 test vector에 대해 기대 결과값 **과** 기대 F/L/C/N/Z flag를 먼저 손으로 계산해 waveform과 대조한 뒤, 통합 프로세서에서 branch 판단과 PC 갱신을 추적했다.

### 검증

- register file, ALU, shifter, fetch/decode 단계의 모듈별 testbench를 손으로 계산한 값과 대조했다.
- 21개 명령어로 된 binary program을 통합 실행했다. 레지스터 초기화, `LUI`/`ORI`로 immediate 구성, pointer 레지스터를 통해 store하고 증가시키는 `CMP` + `JNZ` 루프, `JMP`로 복귀까지 decode한 순서대로 실행되는 것을 waveform에서 확인했다.

상세 내용, decode한 program listing, flag test vector, 시뮬레이션 스크립트, Icarus Verilog 재실행 로그는 저장소에 있다.
