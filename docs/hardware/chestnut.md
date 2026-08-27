# Chestnut (External GPU)

**Chestnut** is comma.ai's external GPU (eGPU) dock. It connects a desktop graphics card to your comma device over USB4, giving openpilot far more compute than the built-in chip can provide on its own.

StarPilot fully supports Chestnut on the **Comma 3**, **Comma 3X**, and **Comma 4**.

Learn more from comma.ai: [Introducing chestnut](https://blog.comma.ai/chestnut/) · [Chestnut shop](https://comma.ai/shop/chestnut)

## What does Chestnut do?

Comma devices are built around low-power, on-device inference — roughly a 10 W compute budget. That works well for most driving models, but newer **chestnut-class models** are much larger and need a desktop GPU to run in real time.

Chestnut bridges that gap. You mount a GPU in the passenger footwell or under the passenger seat, connect it to 12 V power, and plug a USB cable into your comma device. At startup, model weights load over USB4; after that, inference runs entirely on the GPU.

## Do I need Chestnut?

**No, unless you want the biggest models.** Most StarPilot driving models run fine on the comma device's built-in compute. You only need Chestnut if you want to download and run models marked as requiring an external GPU.

In StarPilot and [Galaxy](../usage/galaxy.md):

- Models that need Chestnut are labeled accordingly in the model manager.
- If Chestnut is not connected (or not ready), those models cannot be selected or downloaded.
- StarPilot falls back to a built-in model if your current selection requires a GPU that is not available.

You do not need to change any settings manually — StarPilot checks for Chestnut at boot and exposes GPU models only when the link is ready.

## Hardware options

Comma sells two Chestnut kits:

* **tiny chestnut** ($249) — the dock only; bring your own compatible GPU and power supply.
* **Ready to drive** (~$799–899) — includes an AMD Radeon RX 9060 8 GB, car power cable, longer USB cable, and mounting hardware.

Both use the same open-source firmware. See comma's shop page for current pricing and availability.

## Setup overview

This is a high-level summary. Follow comma's included instructions (or their blog) for the full install:

1. Assemble Chestnut with your GPU and connect GPU power.
2. Mount Chestnut in the passenger footwell or under the passenger seat.
3. Connect Chestnut to 12 V vehicle power (cigarette lighter or similar).
4. Run the USB cable from Chestnut to your comma device's USB4 port.
5. Boot StarPilot — the device should detect Chestnut automatically.

> [!NOTE] Firmware
> Chestnut ships with custom firmware that StarPilot recognizes. The device checks that the firmware is ready before enabling GPU models. If GPU models stay unavailable after connecting Chestnut, ask in [Discord](https://firestar.link/discord).

> [!TIP] Driving models
> See the [Driving Model guide](../usage/driving-model.md) for model recommendations. Most users should start with a standard on-device model before considering chestnut-class options.
