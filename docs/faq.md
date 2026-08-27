---
description: Frequently asked questions
---

# Frequently Asked Questions

Can't find an answer to your question? Post in 
[Discord](https://firestar.link/discord)

## What is the Galaxy? Can I change settings from my phone?

[Yes.](./usage/galaxy.md)

## Does StarPilot support Comma 3, 3X, and 4?

Yes. StarPilot fully supports all three comma devices, including features that stock openpilot has dropped on older hardware (such as the Comma 3). See the [Comma Devices](./hardware/comma.md) page for details.

## Does StarPilot support Chestnut (external GPU)?

Yes. StarPilot detects Chestnut on Comma 3, 3X, and 4 and unlocks chestnut-class driving models when the hardware is ready. Most users do not need Chestnut — see the [Chestnut page](./hardware/chestnut.md).

## Why is my car driving terribly?

It may be a bad setting. Try enabling safe mode to revert to all defaults.
If that fixes it, reset your toggles to defaults. 
If not, create a troubleshooting thread in the discord.

## Will installing openpilot void my warranty?

<https://comma.ai/support#will-installing-a-comma-device-void-my-warranty>

## Is the openpilot install reversible?

Yes. The openpilot hardware install is fully reversible. 
There are no car modifications, just custom harnesses that intercept at the existing harnesses.

When the comma USB-C is unplugged, your car can't tell the difference.

When the openpilot hardware (camera harnesses, pedal, ASCM, SASCM, SDSU, SDGM, etc.) are removed,
the car returns to stock.

## Will openpilot navigate on its own?

No — not in the "take me home" sense. But StarPilot does use navigation as a *driving aid*.

You can set a destination from [the Galaxy](./usage/galaxy.md) and StarPilot will inject 
turn desires into the driving model (even models that don't natively support navigation) 
and attempt to slow down for upcoming turns. In practice this means the model 
won't fight you when you make a turn because it knows you're turning, and on highways 
it can keep right to take an exit with *some* consistency depending on the model. 
Anything beyond that is iffy. See [the operation guide](./usage/operation.md#navigation) for details.

Comma dropped the original navigate-on-openpilot feature, so it is not a full self-driving 
or point-to-point routing system. With the limitations of most cars (especially steering torque) 
and openpilot hardware, do not expect Tesla-style full autonomy.
Openpilot remains a driver-assistance system and continues to improve; lateral control is typically strong,
while longitudinal behavior requires more caution and attention.

## How do I clear the "LKAS Fault: Restart the car" error?

1. Turn your car off
2. Open your car door
3. Wait 2 minutes (you can close your door in the meantime)
4. Turn car on
5. Done. LKAS fault should have cleared.

> [!TIP] 
> On Bolts, when the comma is plugged in: the steering wheel LKAS button does nothing 
> and the light above it will always be off. 
> If the button is pressed, it will display "LKAS unavailable", 
> but openpilot steering will still work.
> LKAS faults also only show on the comma UI, not on car dash.

## How do I avoid LKAS faults?

1. Never reboot, unplug, or power off the comma while your car is on. 
This **will** cause an LKAS fault.
2. Sometimes LKAS faults just happen. GM cars are very sensitive to the exact timing of the
steering messages. Heat can cause thermal expansion of the connectors, so if you see this
happen while driving, it is a good idea to reseat your openpilot connections: 
GM harness, OBD-C, pedal ethernet, etc. While reseating connectors, you can breathe hot air
into the connector (like fogging up a window, not blowing out a candle) to help clear dust
and dissipate static buildup.

## How do I clear the "Cruise Fault: Restart the car" error?

This error applies only to vehicles with adaptive cruise control (ACC).

1. Turn car off
2. Open car door
3. Close car door
4. Turn car on
5. Wait 5 seconds
6. If your error is cleared, you are done. 
If the error is still present, go back to step 1. This can take 6 or more tries.

## How do I clear the "Controls Mismatch" error?

1. Turn car off
2. Wait 5 seconds
3. Turn car on

If the error persists, restart the comma device with the car off.

> [!NOTE] Remote Start Issues
> If you use remote start and the "boot comma with remote start" setting is enabled,
> to avoid issues, you should cycle the car off and then back on
> again after you get in. Otherwise, you might get the Controls Mismatch error.

## How do I upload logs for troubleshooting?

Logs are sent as routes. A route is a single drive (from car on to car off), 
with 1 minute segments. Log data contains all Openpilot data: video, comms, gps, etc.

1. Navigate to [connect.comma.ai](https://connect.comma.ai)
2. Find the route your issue happened on and click on it. 
3. Click and drag the video slider over the section where the error happened.
The video will loop over this selected section, make sure the error is within. 
To undo your last selection, click the back arrow just above the video slider. 
Once you are happy with the segments selected, proceed to the next step.
4. Click `Files`, then next to `All logs`, click `(upload ## logs)`
5. Wait for data to be uploaded (you can check the progress using `Files` > `View Upload Queue`)
6. Click `More info`, then enable `Public access` and 
copy the Route info using the Copy button: ![Copy button](./assets/images/copy_clipboard.png)
7. Create a post using the buttons in 
[the #submit-feedback-and-reports channel of the discord server](https://firestar.link/discord). 
Be as descriptive as possible. 
Also include the approximate minute(s) in the route it happened.


> [!TIP] Ending a route log early
> To make it easier to find the error, you can force the log to end early using:
> Settings > Utilities > Force offroad. This will make sure the error is near the end of
> the log. 

## What is redneck ACC (aka CC Long)?

This feature emulates a very basic ACC system 
by using the built-in cruise control system and then 
spamming virtual presses of the + and - buttons to control speed. 

Redneck ACC is able to handle small speed variations while following a lead on the highway. 
However, it is unable to change speed fast enough to 
handle slowing or stopped leads or operate below 24 mph (due to GM limitations),
so you will be experiencing a small fraction of what openpilot is capable of.
It is also quite jerky.

Do not expect it to stop for cars or react quickly. As always, be ready to intervene.

## I'm stuck on the boot logo screen. How do I fix it?

This is usually caused by a sticky param, especially when coming from another FrogPilot-based fork.

1. Unplug the device
2. Wait 60 seconds
3. Plug it back in
4. Tap the center of the screen over and over until the reset prompt comes up
5. Reset
7. Install using link: `firestar5683/saveme`
8. After the device boots, use the [branch switcher](./software/starpilot.md#changing-branches) to go back to `StarPilot`

If issues persist, reach out in [Discord](https://firestar.link/discord).

> [!IMPORTANT] Do **not** use this if you can access Galaxy!
> If you can access [Galaxy](./usage/galaxy.md), 
> open "Backup and Restore" and click "SAVE ME" instead of using this branch.
> It is faster and safer, the branch is not always up to date with latest AGNOS 
> and you avoid the need to swap branches back after.

## My device is behaving oddly. What is a "saveme"?

Sometimes the device can get into a bad state due to a bad setting or conflicts during updates 
(especially if you went a long time without updating). 
A "saveme" will reset all settings and return to near new state (without require a flash).

Go to [Galaxy](./usage/galaxy.md), open "Backup and Restore" and click "SAVE ME".

## How do I fix "Process Not Running dmonitoringmodeld"?

This is seen on upstream FrogPilot builds on newer comma devices (post‑September 2025)
due to upstream provisioning changes. A one‑time install of StarPilot resets the device
state to a pre‑change baseline so FrogPilot can be reinstalled cleanly afterward.

1. Install StarPilot by [following the install instructions](./software/starpilot.md)
2. If you are staying on StarPilot, stop here. Otherwise, proceed.
3. Uninstall StarPilot
4. Reinstall FrogPilot

## How do I fix the "Propulsion Power Reduced" Error on my dash and regen not working? (for Bolts with Comma Pedal)

Your Bolt may have had a momentary issue communicating with the throttle pedal,
causing it to enter a limp mode. 
To clear any potential thermal expansion shifting or static buildup issues:

1. Turn off the car.
2. Unplug all connectors for the Comma Pedal.
3. Breathe hot "sultry" air into the connector ends.
This includes the two connectors coming out of the Comma Pedal box and the car side (if possible). 
This is hot breath like fogging up a window, not blowing out a candle.
4. Re-connect all connectors. 

If the issue still persists, post in the troubleshooting thread.

## How do I fix the "CAN bus disconnected" Error?

Openpilot had an issue communicating on the CAN bus. 
Reseat (unplug and plug back in) all of your openpilot connections 
(harnesses, OBD-C, pedal, etc).
