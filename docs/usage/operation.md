# Openpilot Operation

## Capabilities

Openpilot is driver assistance, not self-driving.
It performs best on highways, providing a (mostly) hands-free experience.

It performs adaptive cruise control and automated lane centering. 
It will stop at most traffic lights and rolling stop for some stop signs.
It can handle most curves, especially at the recommended curve speed limit. 
It will attempt to do low-speed turns (be prepared to take manual control), 
but is limited by available steering torque, which depends on the vehicle.

It is not full self-driving. 
It requires you to pay attention using a driver monitoring camera instead of wheel nags.

It is actively developed and continues to improve (eg. the rolling stops),
but this is a snapshot of what it currently does.

## Basic Operation

1. Pay attention at all times. You are responsible for your vehicle's operation.
2. You can manually override or disengage openpilot at any time. 
Steering, throttle, and brakes can be used at any time.
3. To engage openpilot (ie. to make it control your speed and steering), 
engage your CC system as normal by turning CC ON, then pressing SET/-. 
4. To disengage openpilot, it should be the same as your CC system. 
Press CC cancel, CC OFF, or hit the brakes.
5. To adjust openpilot max speed, use the CC +/- buttons. 
Depending on the car, your dash may not reflect the max speed, 
so instead use the openpilot UI's max speed shown.

## Always On Lateral

With Always on Lateral (AOL), steering (lane centering) stays active at all times, 
even when Cruise Control (CC) is disengaged or pressing throttle/brake pedal. 
This does not change the manual override safety protocols, 
you can always override it by manually steering.

To enable, turn the CC system on. 
To disable, turn CC system off.

To permanently disable, [see settings](./settings.md#always-on-lateral-recommend-turning-on)

## Lane Changes

1. Verify it is safe to change lanes.
2. Turn on blinker.
3. Nudge the steering wheel to initiate the lane change.

> [!WARNING] Check your blind spot!
> Openpilot will attempt to use your blind spot monitors on supported cars, 
> but you should always check yourself.

> [!WARNING] Nudge-less lane changes
> Step 3 can be skipped if nudge-less lane changes are enabled in settings.
> Be careful if you use this non-recommended setting.

## UI Basics

### Border Colors

1. None - openpilot is not engaged
2. Blue - openpilot is controlling only steering (AOL)
3. Green - openpilot is engaged in chill mode
4. Grey - openpilot is engaged, but overridden (manually steering or pressing throttle pedal)
5. Orange - openpilot is engaged, [CEM](#conditional-experimental-mode) is active
6. Red - openpilot is engaged, personality set to Traffic Mode
7. Purple - switchback mode is enabled, which limits the frequency of "Steer limit exceeded" warnings

### Max Speed

Your max speed is shown in the top left of the UI.

## Speed Limit Controller 

The Speed Limit Controller (SLC) will use map data from [OpenStreetMap (OSM)](https://openstreetmap.org) 
to limit your max speed based upon speed limit data for your vehicle location.

See the [Speed Limit Controller guide](../exclusive/speed-limit-controller.md) for source, offset, confirmation, fallback, and override settings.

Speed limit for your current location is shown below your max speed. 
The active +offset shown is how far above the speed limit it will allow.
Offsets are configurable in settings.

If your max speed is *red*, SLC is limiting the speed to the speed limit + offset.

If your max speed is *orange*, your max speed is still active but approaching the SLC limit.

### Submitting New Speed Limits

If you see an incorrect or missing speed limit, go to OSM and submit an edit. 
Your openpilot speed limit data will update in about a week.

### Vision Speed Limit Detection

In addition to OSM map data, StarPilot can read speed limit signs directly from the 
camera to feed the Speed Limit Controller. It is enabled under 
**Toggles -> Longitudinal -> Speed Limit Controller**.

> [!WARNING] Accuracy is currently poor
> Vision speed limit detection is early and its accuracy is currently quite bad.

#### Help us improve it

The model gets better with more real-world driving data. If you'd like to help:

1. Enable **Vision Speed Limit Detection** and **Auto-Bookmark Vision Signs** 
under **Toggles -> Longitudinal -> Speed Limit Controller**.
2. Under **Maps**, select the regions you'll be driving in, 
then **Save Selection** and **Download Maps**.
3. Drive as normal.
4. In [Comma Connect](https://connect.comma.ai), open the route, 
choose **Files -> Upload All Files**, then under **More Info** enable **Public Access** 
and copy the route ID.
5. Submit the route through the 
[vision speed limit submission form](https://forms.gle/TBptqMNbNaW27u7g9).

> [!TIP] Let your uploads finish
> Make sure all files finish uploading before turning the device off or disconnecting 
> from Wi-Fi/hotspot. You can confirm in Comma Connect that `rlog.zst` and `fcamera.hevc` 
> are present for every segment.

## Curve Speed Controller 

![curve speed controller icon](../assets/images/curve_speed.png){: style="height:50px;width:50px"} 

The Curve Speed Controller (CSC) will limit your max speed in order to match how you take curves.
If you see the curve speed icon next to your max speed, 
CSC is overriding your max speed to the speed shown. 

If you think it is going too fast or slow for the curve, 
manually speed up or slow down by overriding throttle/brake 
and it will learn to match that speed over time.

## Experimental Mode

Normal openpilot operation is known as *chill mode*.

Experimental mode, also known as end-to-end longitudinal (e2e long), 
gives the driving model full control of the gas/brake. 
Experimental mode does not affect steering.
It is not recommended at the moment. 
It may brake or accelerate erratically.

One day, driving models will be good enough to stay in experimental mode full time, 
but for now we recommend keeping it disabled.

## Conditional Experimental Mode 

Conditional Experimental Mode (CEM) automatically switches into experimental mode 
under certain conditions, like approaching a traffic light or stop sign. 
Experimental mode can behave strangely at times, 
so we conditionally swap into it for conditions we know the driving model is better at.

The condition that caused the mode swap is indicated by a widget. 

### CEM Widgets and Meaning

* Couch - Chill/normal mode
* Traffic Light - Traffic lights or stop signs
* Car - (Slower or stopped) lead car
* Speedometer - CEM activated by being below speed threshold
* Steering wheel - Turn signal is on, speed is below threshold, and no detected lane
* Map - Navigation

## Conditional Chill Mode

Conditional Chill Mode (CCM) is essentially the inverse of CEM:

* **Conditional Experimental Mode (CEM)** — keeps you in chill mode by default, 
and automatically switches *to* experimental mode when set conditions are met, 
so the model can handle challenging situations with smarter decision making.
* **Conditional Chill Mode (CCM)** — keeps experimental mode on by default, 
and temporarily switches *to* chill mode in simple cruising scenes 
where holding speed is usually better.

The idea: experimental mode is better at stopping and recognizing the key parts of a 
complex scene, so why not leave it on as long as it's holding speed? 
CCM keeps experimental on unless it hits very specific conditions — including a configurable 
maximum "under set speed", which tells the model "you're fired" 
and drops back to chill mode if it's bleeding off too much speed.

Like CEM, an on-screen indicator shows when CCM is active. 
Settings for CCM are available in both the C3 UI and [the Galaxy](./galaxy.md).

> [!IMPORTANT] CCM and CEM are mutually exclusive
> Only one can be active at a time. If both are enabled, **CEM takes precedence**.

## Navigation

StarPilot can use a destination you set to *assist* the driving model through turns. 
You set a destination from [the Galaxy](./galaxy.md), and StarPilot injects turn desires 
into the driving model — even models that don't natively support navigation. 
It will also attempt to slow the vehicle down for upcoming turns.

For a full overview — setup, Galaxy workflow, features, and credits — see the [Navigation guide](../exclusive/navigation.md).

> [!IMPORTANT] Navigation requires setup first
> A Mapbox key, the **Use Route Desires** toggle (steering), and the 
> **Use Route Speed Control** toggle (slowing for turns) are required before navigation 
> does anything. See [the settings guide](./settings.md#navigation) for setup.

> [!WARNING] This is a driving aid, not point-to-point autonomy
> This is **not** "the model will take you home." 
> It's closer to "the model won't fight you when you're making a turn, 
> because it knows you're turning." 
> On highways it can keep right to take an exit with *some* consistency 
> (how reliably depends on the model), but anything beyond that is iffy. 
> Always stay alert and be ready to steer yourself, especially at intersections and forks.

> [!NOTE] Works on any model
> Because turn desires are injected into the model, navigation guidance works 
> regardless of whether the driving model itself supports navigation. 
> See [the FAQ](../faq.md#will-openpilot-navigate-on-its-own) for more context.
