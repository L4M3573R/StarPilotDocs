# Comma Pedal

The Comma Pedal is an interceptor that sits between your throttle pedal and the car.  
When openpilot is disengaged, your throttle pedal is normal.
When openpilot is engaged, openpilot can send its own throttle pedal commands to control
your speed, but will immediately stop sending its own commands when you override or 
disengage.

For non-ACC vehicles (flashed ACC also excluded), the comma pedal will be used to
accelerate and "brake" using regen in one-pedal mode. For ACC vehicles, the 
ACC commands will be used to control gas/brake, but the Comma Pedal will be used to exit
standstill (slight tap of the throttle to start moving).

You always have control, so you can input your own throttle commands at any time, 
overriding openpilot control if it is engaged.
Openpilot will also disengage in the same way as stock CC: when you press the brake pedal, 
throttle pedal, regen paddle, CC cancel button, or CC off button.


## Pedal Purchase List

{% include-markdown "./embed/see-car-guide.md" %}

* [Comma Pedal](https://shop.beartech.ca/products/comma-pedal)
* Ethernet cable
    * At least 10ft long (reaches from harness box to throttle pedal)
    * Cat5e is sufficient (higher ratings will be thicker and harder to route under the car's headliner)
    * Flat cables can be easier to route, but quality can be more variable than round cables.
* Optional: [DFU Key](https://shop.beartech.ca/products/dfu-key)
    * If the firmware is ever updated, you need a DFU key (or DIY if you are mechanically inclined) to
apply new firmware. See [the Bolt pedal firmware instructions](../cars/bolt.md#pedal-firmware-flashing) for details.

> [!TIP] Bundle your pedal with a harness box.
> If you already have a Harness Cable, 
> but your Harness Box does not have an RJ45 port (or you do not have one), 
> you can bundle your Pedal with a 2x9 or 2x13 pin Harness Box - check your specific cable to 
> ensure you purchase the correct box. 
