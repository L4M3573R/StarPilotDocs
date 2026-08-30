---
description: How to pick the correct hardware for running StarPilot on a Volt
---

# Required Hardware - Volt & Other ASCM/SDGM Cars

The Volt has a number of possible configurations. 
This page lists the recommended method per car type, and all possible methods.

There are two parts to OpenPilot control: Lateral Control (Steering) & Longitudinal Control (Gas/Brake).

ASCM & SDGM give the comma control over steering. Your car's ACC will function as normal. 

SASCM allows you to override the built in ACC and use OpenPilot Longitudinal control. 
If you have stock ACC and do not wish to use OpenPilot Long, 
you can just purchase the ASCM/SDGM portion of the suggestions.

## Recommended Config per Car Model

* 2017-2018 Chevy Volt with Factory ACC: [ASCM Harness & SASCM](#ascm-harness-sascm)
* 2019 Chevy Volt with Factory ACC: [SDGM Harness & SASCM](#sdgm-harness-sascm)
* Volts without Factory ACC: [Volts without ACC](#volts-without-acc)
* Non-Volt Car with ASCM: [ASCM Harness & SASCM](#ascm-harness-sascm)
* Non-Volt Car with SDGM: [SDGM Harness & SASCM](#sdgm-harness-sascm)

{% include-markdown "../hardware/embed/beartech.md" %}
{% include-markdown "../hardware/embed/comma-power.md" %}

## ASCM Harness & SASCM

### Purchase List

1. [Comma 4](../hardware/comma.md)
2. [ASCM Harness Plus + Harness Box](https://shop.beartech.ca/products/ascm-harness?variant=44900990124213)
3. [SASCM](https://shop.beartech.ca/products/sascm-for-gm-vehicles)
4. [OBD-C Cable](../hardware/obd-c.md) - 15 ft 
5. Optional: [Comma Pedal](../hardware/comma-pedal.md) for the ability to start from a stop in 2018 and up Volts

### Reference Connection Diagram

![Reference diagram](../assets/images/hardware/volt/ASCM_SASCM_connection_diagram_final.png)

## SDGM Harness & SASCM

### Purchase List

1. [Comma](../hardware/comma.md)
2. [SDGM Harness + Harness Box](https://shop.beartech.ca/products/sdgm-harness)
3. [SASCM](https://shop.beartech.ca/products/sascm-for-gm-vehicles)
4. [OBD-C Cable](../hardware/obd-c.md) - 10 ft 
5. Optional: [Comma Pedal](../hardware/comma-pedal.md) for the ability to start from a stop 

## Volts without ACC 

### Purchase List

1. [Comma](../hardware/comma.md)
2. Choose a harness:
    1. [OBD-II Harness](../hardware/obd-harness.md)
    2. [GM Harness/Harness box (only for Volts with stock LKAS)](../hardware/gm-harness.md)
3. Optional: [Comma Pedal](../hardware/comma-pedal.md) for the ability to start from a stop in 2018 and up Volts

Lateral (steering) control:

1. If you have stock LKAS, your volt is capable of openpilot lateral control.
2. If not, you need to [flash LKAS firmware](#flashing-volt-firmware)

Longitudinal (gas/brake) control:

1. [Flashing your Volt firmware for ACC](#flashing-volt-firmware).
**This will give you the best openpilot experience.**
1. [Redneck ACC](#what-is-redneck-acc-aka-cc-long)
1. A potential option is the [Comma Pedal](../hardware/comma-pedal.md), but you will be limited to L mode regen.
This is completely untested and undeveloped in the Volt. Feel free to contribute!

### Flashing Volt Firmware

> [!CAUTION] 
> Flashing your car's firmware is at your own risk.
> Unlike the custom harness installs, 
> flashing is not reversible by simply unplugging hardware.

pinballben is the resident expert on flashing Volt firmware, who will provide the instructions and hardware
for a fee. DM on [Discord](https://firestar.link/discord) (through the member list).

> [!CAUTION] Flashing ACC 
> Flashing ACC will remove stock CC. 
> This can be restored by re-flashing stock firmware. 

## GM Vehicle Settings

Enable **Disable Automatic Fingerprint Detection** and manually select your vehicle make and
model. Fingerprinting can be inconsistent on GM vehicles, so it is best to select the car
manually.

## What is Redneck ACC (aka CC Long)?

This feature emulates a very basic ACC system by using the built-in cruise control system and
then spamming virtual presses of the + and - buttons to control speed.

Redneck ACC is able to handle small speed variations while following a lead on the highway.
However, it is unable to change speed fast enough to handle slowing or stopped leads or operate
below 24 mph due to GM limitations, so you will be experiencing a small fraction of what
openpilot is capable of. It is also quite jerky.

Do not expect it to stop for cars or react quickly. As always, be ready to intervene.

## GM LKAS Faults

GM cars are very sensitive to the exact timing of the steering messages. Heat can cause thermal
expansion of the connectors, so if an LKAS fault happens while driving, reseat your openpilot
connections, such as the GM harness, OBD-C, and pedal ethernet. While reseating connectors, you
can breathe hot air into the connector like fogging up a window, not blowing out a candle. This
can help clear dust and dissipate static buildup.
