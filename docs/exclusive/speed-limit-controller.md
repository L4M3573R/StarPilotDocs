---
description: How StarPilot's Speed Limit Controller works and how to configure it
---

# Speed Limit Controller

The Speed Limit Controller, or SLC, limits StarPilot's maximum driving speed using the current posted speed limit plus a configurable offset. It can obtain speed limits from map data, the vehicle dashboard, and optional camera-based sign detection.

SLC does not replace the driver's judgment. Speed-limit information can be missing, delayed, or incorrect. Always follow posted signs and adjust the set speed when needed.

## Enable SLC

Open `Toggles`, then `Longitudinal`, and enable `Speed Limit Controller`. SLC and its related settings are available in the advanced settings tier.

When SLC is enabled, the driving screen shows the current speed limit below the maximum set speed. The optional offset display shows how far above or below the posted limit SLC is allowed to target.

## Driving-screen colors

The maximum set-speed color indicates what SLC is doing:

* Red means SLC is actively limiting the maximum speed to the posted limit plus the configured offset.
* Orange means the driver's maximum set speed is still active, but the vehicle is approaching the SLC limit.
* The normal color means SLC is not currently limiting the maximum set speed.

## Speed-limit sources

SLC can use the following sources:

* Dashboard reads a speed limit supplied by the vehicle when the car supports it.
* Map Data uses downloaded map information for the current road.
* Vision uses the road camera to detect speed-limit signs.

Use `Primary Speed Limit Source` to select the first source SLC should trust. Use `Secondary Speed Limit Source` to select a backup when the primary source is unavailable. `Highest` and `Lowest` can be selected as the primary behavior when you want SLC to choose between available limits by value.

`Use Mapbox as Fallback` allows Mapbox data to provide a limit when the configured sources do not have one.

> [!WARNING] Vision speed limits
> Vision Speed Limit Detection is experimental and can misread signs. Use confirmation for new limits and keep another source available until vision detection is reliable in your area.

## Configure speed offsets

SLC supports a separate offset for each posted-speed range:

| Posted speed | Setting |
| --- | --- |
| 0 to 24 mph | Speed Offset (0-24 mph) |
| 25 to 34 mph | Speed Offset (25-34 mph) |
| 35 to 44 mph | Speed Offset (35-44 mph) |
| 45 to 54 mph | Speed Offset (45-54 mph) |
| 55 to 64 mph | Speed Offset (55-64 mph) |
| 65 to 74 mph | Speed Offset (65-74 mph) |
| 75 to 99 mph | Speed Offset (75-99 mph) |

A positive offset allows a target above the posted limit. A negative offset sets the target below it. For example, a 55 mph limit with a +5 mph offset produces an SLC target of 60 mph.

Enable `Show Speed Limit Offset` to display the active offset on the driving screen.

## Confirm new speed limits

Enable `Confirm New Speed Limits` if you want SLC to ask before applying a changed limit. You can require confirmation separately for higher and lower limits.

When confirmation is requested:

* Tap the flashing speed-limit widget or press Cruise Increase to accept the new limit.
* Press Cruise Decrease to deny it.
* Ignoring the prompt for 30 seconds also denies it.

Confirmation is useful when map or vision data sometimes reports incorrect limits.

## Look ahead for changes

`Higher Limit Lookahead Time` and `Lower Limit Lookahead Time` control how far ahead SLC anticipates upcoming map-based speed-limit changes. Each setting can be configured from 0 to 30 seconds.

A lower-limit lookahead gives the vehicle time to slow before entering a reduced-speed area. A higher-limit lookahead determines how early SLC can prepare for an upcoming increase.

## Match the limit when engaging

Enable `Match Speed Limit on Engage` to set the maximum driving speed to the current posted limit when openpilot first engages.

If this is disabled, the driver's existing maximum set speed remains in effect until SLC needs to limit it.

## Choose fallback behavior

`Fallback Speed` controls what happens when no speed-limit source is available:

* Set Speed uses the driver's current maximum set speed.
* Experimental Mode allows the driving model to manage speed while no limit is available.
* Previous Limit continues using the most recent valid speed limit.

Choose the fallback that best matches how you want StarPilot to behave when map, dashboard, and vision data are unavailable.

## Override SLC

`Override Speed` controls what happens when you manually drive faster than the SLC target:

* None does not create an SLC override.
* Set With Gas Pedal uses the speed reached with the accelerator as the override.
* Max Set Speed allows the driver's maximum set speed to override SLC.

An override does not change the posted speed limit. It only changes the speed SLC allows until the override ends or conditions change.

## Show source information

Enable `Show Speed Limit Sources` to display each available source and its current value on the driving screen.

Additional display options can:

* Show abbreviated source names.
* Hide sources that do not currently have a speed limit.
* Show the active speed-limit offset.

These options are useful when checking why SLC selected a particular limit.

## Incorrect or missing map limits

Map-based speed limits come from [OpenStreetMap](https://openstreetmap.org). If a road has an incorrect or missing limit, correct it in OpenStreetMap. The updated map data may take about a week to reach the device.

See [Vision Speed Limit Detection](../usage/operation.md#vision-speed-limit-detection) if you want to help improve camera-based sign detection.

> [!TIP] Start conservatively
> Start with confirmation enabled and small offsets. Display the source information while testing so you can see where each limit came from. Change one setting at a time and verify its behavior before relying on it regularly.
