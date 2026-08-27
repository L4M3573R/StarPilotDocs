---
description: Choosing and using a comma device with StarPilot
---

# Comma Devices

StarPilot supports the Comma 3, Comma 3X, and Comma 4. All three devices provide the cameras, processing, driver monitoring, storage, and vehicle connection needed to run StarPilot. The correct choice mostly depends on what you already own, whether your car uses CAN FD, and whether you want to buy new or used hardware.

> [!IMPORTANT] Check your car first
> A comma device does not connect directly to every car. Check the [StarPilot car support page](../cars/support.md) and the [comma supported vehicles list](https://comma.ai/vehicles) before buying anything. Your vehicle may require a specific harness, connector, pedal, or other hardware.

## Quick comparison

| Device | Best choice for | CAN FD | Availability | Main difference |
| --- | --- | --- | --- | --- |
| Comma 4 | Most new buyers | Built in | Available new from comma.ai | Much smaller body, improved cooling, and a compact status display |
| Comma 3X | Buyers who find a good used unit | Built in | Usually purchased used | Larger touchscreen and the same general performance and camera layout as the Comma 3 |
| Comma 3 | Existing owners using StarPilot or another supporting fork | Requires a red panda on CAN FD cars | End of life and used only | No longer supported by stock openpilot |

The device does not determine how much steering torque, braking control, or acceleration control your car has. Those capabilities depend on the vehicle and its installed hardware.

## Comma 4

The Comma 4 is comma.ai's current device and is the recommended option for most people buying new hardware. It uses a Snapdragon 845 MAX, includes 128 GB of storage, supports CAN FD without an additional panda, and has LTE, Wi-Fi, GPS, night-vision driver monitoring, and three cameras.

The Comma 4 provides the same general compute, sensor suite, and functionality as the Comma 3X in a body that comma.ai describes as one-fifth the size. Its cooling system is designed for sustained performance, and its small OLED display is used for status and driving information instead of the large touchscreen found on the Comma 3 and 3X.

Purchase from comma.ai: [Comma 4](https://comma.ai/shop/comma-four)

> [!NOTE] Mounts
> Comma 4 mounts are different from Comma 3 and 3X mounts. If you replace an older device with a Comma 4, install the mount supplied for the Comma 4.

## Comma 3X

The Comma 3X uses a Snapdragon 845, three 1080p HDR cameras, a 2160 x 1080 OLED touchscreen, 128 GB of storage, LTE, Wi-Fi, GPS, and infrared lighting for driver monitoring. CAN FD support is built in, so it does not require a separate red panda for CAN FD vehicles.

Comma.ai introduced the Comma 3X as a less complex replacement for the Comma 3 with the same general performance and triple-camera system. It remains a good StarPilot device if you already own one or find a used unit in good condition.

Comma.ai now sells the Comma 4 as its current device. Comma 3X units are generally found through the used market or the comma.ai community Discord.

## Comma 3

The Comma 3 is the oldest of the three devices supported by StarPilot. It uses the same Snapdragon 845 family and triple-camera layout as the Comma 3X, so existing owners can still run current StarPilot releases.

Comma.ai ended official Comma 3 software support on August 26, 2025 to focus on newer hardware. Stock openpilot no longer supports it. StarPilot and some other forks continue to support the Comma 3, but buying one is not advised. Existing owners can continue using it with a supporting fork.

> [!WARNING] CAN FD vehicles
> A Comma 3 requires a [red panda](https://comma.ai/shop/red-panda) to communicate with a CAN FD vehicle. The Comma 3X and Comma 4 have CAN FD support built in. Existing Comma 3 owners should check their vehicle before purchasing a replacement panda.

## What else do I need?

A typical installation requires:

* A supported comma device
* The correct car harness and harness connector
* A harness box
* An OBD-C cable
* A compatible windshield mount

Some StarPilot-supported vehicles need additional hardware, such as a pedal, GM harness, ASCM or SDGM integration, or an OBD-C setup that differs from comma's stock installation. Follow the guide for your specific vehicle rather than ordering from the general list alone.

See the following pages before installation:

* [Car support](../cars/support.md)
* [Installing your Comma device](../install/comma.md)
* [Installing StarPilot](../software/starpilot.md)
* [OBD-C cable](./obd-c.md)
* [GM harness](./gm-harness.md)
* [Comma Pedal](./comma-pedal.md)

## Buying a used device

Before buying a used Comma 3X, confirm that:

1. The device boots and reaches its setup screen.
2. The road and driver-monitoring cameras work and are unobstructed.
3. The display, USB-C port, Wi-Fi, and GPS work correctly.
4. The listing includes the correct mount and cable, or you have replacements available.
5. You know whether your vehicle requires CAN FD.
6. You can obtain the correct harness and any StarPilot-specific hardware for your car.

Do not assume that a used device includes the correct harness for your vehicle or qualifies for comma.ai warranty service or trade-in credit. The Comma 3 is end-of-life hardware, so buying one is not advised even though StarPilot and some other community forks continue to support it.

## Optional hardware and services

StarPilot can pair a comma device with [Galaxy](../usage/galaxy.md) for remote settings and device management. Comma Prime is optional and is not required to run StarPilot.

StarPilot also supports [Chestnut](./chestnut.md) for users who want to run larger driving models with an external GPU. Most users do not need Chestnut.

## Which one should I choose?

* Buy a Comma 4 if you want new hardware, built-in CAN FD support, and the smallest current device.
* Keep using a Comma 3X if you already have one. There is no need to replace a working device solely to run StarPilot.
* Buying a Comma 3 is not advised. You can keep using one if you already own it and plan to remain on StarPilot or another fork that supports it.

Regardless of the device, you must remain attentive and ready to take control. StarPilot and openpilot are driver-assistance systems, not self-driving systems.
