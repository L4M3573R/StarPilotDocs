---
description: Bluetooth audio and controller support in StarPilot
status: experimental
---

# Bluetooth Controls

StarPilot has native kernel-level Bluetooth support across the Comma 3, Comma 3X, and
Comma 4. It is wired into StarPilot's audio and controller paths.

You can pair Bluetooth devices, use them for audio output, and map controller buttons to
favorites. Cars with limited access to steering-wheel buttons can add a Bluetooth accessory
and have it interact with StarPilot natively.

This has been tested with:

* PlayStation 5 controllers
* Xbox controllers
* Macropads
* Keyboards
* A mouse
* Several Bluetooth audio devices

Devices like these can be found for around $20 on Amazon and should integrate natively.
This should greatly improve the experience in cars like Teslas and Polestars.

## Pairing and Audio in Galaxy

Open Galaxy and select `Bluetooth` from the sidebar. From here, you can turn Bluetooth on,
scan for devices, connect or disconnect a device, forget a pairing, select an audio device,
and test its audio.

[![Galaxy Bluetooth settings](../assets/images/bluetooth/galaxy_bluetooth_2.png){ width="450" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_2.png)

The `Controllers` page lists connected input devices. You can test their buttons, map buttons
to favorites, or select a gamepad for Joystick Mode.

[![Galaxy controller settings](../assets/images/bluetooth/galaxy_bluetooth_1.png){ width="450" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_1.png)

## Bluetooth Controller Examples

Steering-wheel-mounted Bluetooth controls are one option for cars that do not give StarPilot
access to enough factory wheel buttons.

[![Round steering-wheel Bluetooth controller](../assets/images/bluetooth/galaxy_bluetooth_3.png){ width="250" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_3.png)

[![Strap-mounted steering-wheel Bluetooth controller](../assets/images/bluetooth/galaxy_bluetooth_4.png){ width="250" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_4.png)

## On-Device Bluetooth Management

On-device Bluetooth management was also added to Big UI for the Comma 3 and Comma 3X.

The Bluetooth icon appears along the bottom of the Big UI home screen:

[![Bluetooth icon in Big UI](../assets/images/bluetooth/galaxy_bluetooth_5.png){ width="450" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_5.png)

Connected devices and the selected audio device can be managed from the Bluetooth screen:

[![Connected Bluetooth device in Big UI](../assets/images/bluetooth/galaxy_bluetooth_6.png){ width="450" loading="lazy" }](../assets/images/bluetooth/galaxy_bluetooth_6.png)
