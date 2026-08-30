---
description: How to pick the correct hardware for running StarPilot on a Bolt EV
---
# Bolt Hardware

## Vehicle Quirks

Things to be aware of for your vehicle relating to openpilot:

* Openpilot cannot steer below 7 mph.
* Non-ACC Bolts are limited to regen-only braking using a [Comma Pedal](../hardware/comma-pedal.md). 
This means a max 70kW of deceleration meaning no emergency stops 
and poor low-speed slowing performance. 
You will occasionally need to brake manually.
* ACC Bolts without a pedal are limited to 10kW of regen 
(but unlike non-ACC, openpilot can control your friction brakes).
    * With a [Comma Pedal](../hardware/comma-pedal.md), openpilot blends friction braking 
with up to 70kW of regen. See [ACC Bolts](#acc-bolts).
* ACC Bolts without a pedal do not have stop and go support (press accelerator pedal or press CC resume).
    * ACC and non-ACC Bolts with a Comma Pedal do have stop-and-go support.
* *22-23 Bolts only*: Sport mode will decrease available steering torque.
* NNFF should not be used with Bolts.
* The regen paddle can be used to disengage openpilot.
* Steering wheel LKAS button and light do not work when comma is connected (purely a cosmetic issue).
    * If pressed, the dash will display "LKAS is unavailable" but op steering will still work.
    * The button also cannot be used with the openpilot custom button actions 
(ACC models can still use the distance button).

## Car Configuration

### StarPilot Settings

Enable **Disable Automatic Fingerprint Detection** and manually select your vehicle make and
model. Fingerprinting can be inconsistent on GM vehicles, and an ACC Bolt can sometimes be
detected as a non-ACC Bolt, leaving it without gas or brake control.

### Tires

* Keep your tires at the recommended 38 psi.
* Keep your car aligned.
* Swapping tires is okay, but don't change wheel sizes. Changing wheel sizes can cause issues.

### One Pedal Driving/L Mode

StarPilot with the Comma Pedal relies on one pedal driving to slow down. You must have your
car in One Pedal mode on Gen 2 Bolts or L mode on Gen 0 and Gen 1 Bolts.

### Sport Mode

It is generally recommended to leave Sport Mode off. The `Map Accel/Decel to Gears` setting
allows you to use the Sport Mode button to change between acceleration profiles, but Sport
Mode changes the lateral response on Gen 2 cars and gives you less steering torque.

## Vehicle Requirements

> [!WARNING] SuperCruise Bolts Not Supported
> If your Bolt EUV is equipped with SuperCruise, it is not compatible with the Comma or 
> any fork of openpilot at the moment (and likely never will be, sorry).

### Lane Keep Assist System (LKAS)

As with most openpilot compatible cars, the Bolt must be equipped with LKAS (Lane Keep 
Assist System) in order for openpilot to send steering commands. 

#### Trim Levels with LKAS
> [!WARNING] Unofficial list
> Just a guide to help new users. Please do your own research.

* 2017-18 EV: Premier trim with Driver Confidence II package [^1] [^2]
* 2019-21 EV: Any trim with Driver Confidence II package [^3] [^4] [^5]
* 2022-23 EV: All trim levels [^6] [^8]
* 2022-23 EUV: All trim levels [^7] [^9]

### Does your Bolt have Adaptive Cruise Control (ACC)?

Both ACC and non-ACC are compatible with StarPilot, 
but vary slightly in hardware recommendations.

#### Trim Levels with ACC

* 2022-23 EV: 2LT trim level with Adaptive Cruise Control package [^7] [^9]
* 2022-23 EUV: Premier trim level [^6] [^8]

## Openpilot Hardware List for Bolt

1. [Comma 4](../hardware/comma.md)
2. [GM Harness and Harness Box](../hardware/gm-harness.md)
3. [Comma Pedal](../hardware/comma-pedal.md) (optional, but ***strongly recommended for non-ACC cars***)

{% include-markdown "../hardware/embed/beartech.md" %}
{% include-markdown "../hardware/embed/comma-power.md" %}

### Should I buy a Comma Pedal?

Our recommendation for whether or not to purchase the pedal depends on if your car is
[ACC](#acc-bolts) or [Non-ACC](#non-acc-bolts).

#### Non-ACC Bolts

In non-ACC bolts, the Comma Pedal is ***strongly recommended***.
It allows openpilot to accelerate and decelerate using regen braking and one pedal
driving mode (the L gear). It is also capable of stop-and-go (the main reason for comma 
pedal on other vehicles).

The only reasons to not use a pedal interceptor with your non-ACC Bolt are cost or if you 
are uncomfortable with the idea of installing the pedal interceptor.

Without the pedal, openpilot is *very* limited in its ability to control the speed of your 
vehicle. It will operate 
[using a workaround we call "CCLong" or "Redneck ACC"](./volt.md#what-is-redneck-acc-aka-cc-long).

#### ACC Bolts

In ACC bolts, openpilot can request gas and brake commands through ACC commands. 
**Without a pedal**, brake commands only use the friction brakes to slow down 
and regen braking is limited to 10kW (same as coasting in D mode), and it cannot stop-and-go. 

**Adding a comma pedal** is now the best of both worlds. StarPilot blends your friction 
brakes with regen, so an ACC Bolt with a pedal gets **both** full friction braking **and** 
up to 70 kW of regen, plus stop-and-go support. This removes the old tradeoff where adding 
a pedal meant giving up openpilot's access to the friction brakes.

For ACC Bolts, a pedal is optional but recommended if you want stronger regen-based 
slowing and stop-and-go, with no downside to your friction braking.

## Pedal Firmware Flashing

> [!WARNING] Gen 1 Bolts only (2017-2021)

> [!WARNING]
> If you purchased your pedal before June 2025 and have not updated the firmware, you will
> encounter issues with the current version of StarPilot.

The Gen 1 Bolt firmware released in October 2024 ran at twice the speed it should have. This
was corrected in June 2025. Firmware from before October 2024 will run okay, but the newer
firmware is better, so it is best to update.

### Required Resources

* [DFU Key](https://shop.beartech.ca/products/dfu-key)
* [bootstub.pedal.bin](../assets/pedal-firmware/gen1-bolt/bootstub.pedal.bin){:download="bootstub.pedal.bin"}
* [pedal.bin](../assets/pedal-firmware/gen1-bolt/pedal.bin){:download="pedal.bin"}

> [!NOTE] USB cable requirement
> USB-C to USB-C does not work for DFU flashing. There must be a USB-A port somewhere in the
> chain, such as USB-A to USB-C or USB-A to micro-USB. The DFU key/pedal is a USB 2.0 device
> and does not include USB-C circuitry, so a C-to-C cable often will not provide VBUS or
> enumerate the device.

### Flashing Instructions

[Flash Comma Pedal in DFU Mode Tutorial from TinyBear](https://www.youtube.com/watch?v=DNf0OGwXUUQ)

### Other Firmware

The full list of available pedal firmware for other cars is available in
[TinyBear's GitHub repository](https://github.com/fraserxiong/panda_firmware/tree/master).

## Troubleshooting

### Propulsion Power Reduced and Regen Not Working

Your Bolt may have had a momentary issue communicating with the throttle pedal,
causing it to enter a limp mode.

1. Turn off the car.
2. Unplug all connectors for the Comma Pedal.
3. Breathe hot "sultry" air into the connector ends. This includes the two connectors coming
out of the Comma Pedal box and the car side, if possible. This is hot breath like fogging up
a window, not blowing out a candle.
4. Reconnect all connectors.

If the issue still persists, post in the troubleshooting thread.


[^1]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2017-bolt.pdf
[^2]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2018-bolt.pdf
[^3]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2019-bolt.pdf
[^4]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2020-boltev.pdf
[^5]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2021-boltev.pdf
[^6]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2022-boltev.pdf
[^7]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2022-bolteuv.pdf
[^8]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2023-boltev.pdf
[^9]: https://cdn.dealereprocess.org/cdn/brochures/chevrolet/2023-bolteuv.pdf
