# Navigation

Navigation is StarPilot's take on **Navigate on openpilot (NOO)** - a modern version built to work with **any driving model**.

Set a destination from [Galaxy](../usage/galaxy.md) on your phone or computer, pick a route, and StarPilot sends it straight to your comma device. While you drive, the system tracks your position along the route and uses upcoming turns to help guide both steering and speed, without replacing your driving model or hardcoding wheel commands.

## How to use it

1. **Set up navigation first.** You need a Mapbox key and two toggles enabled before anything works. See [Navigation setup](../usage/settings.md#navigation) for the required steps.
2. Open **Navigation** in the Galaxy sidebar.
3. Search for a destination, or pick from **Home**, **Work**, favorites, or recent places.
4. Review the route options — Galaxy shows alternate routes with **live traffic and ETA**.
5. Confirm the route you want. It syncs to your comma device automatically.
6. Engage openpilot as usual. Navigation assists in the background while you stay in control.

You can also **start or cancel navigation remotely** from Galaxy without touching the comma device.

## How it helps while driving

Navigation does not take over your car. Instead, it gives the end-to-end driving model extra context about **where you actually want to go**.

As you move along the route, StarPilot reads upcoming maneuvers: turns, forks, ramps, lane splits, roundabouts, and U-turns and feeds that into the model as desires (for example, turn left, turn right, keep left, keep right).

With **Route Speed Control** enabled, the system can also slow down ahead of sharper maneuvers. The model still does the driving; navigation just nudges it in the right direction.

> [!NOTE] Works on any model
> Turn desires are injected into the model, so navigation guidance works even if the driving model itself was never trained on navigation data.

> [!WARNING] A driving aid, not point-to-point autonomy
> This is not "take me home" self-driving. Navigation helps the model cooperate with turns and exits, but you must stay alert and ready to steer, especially at intersections, forks, and complex merges. See [the operation guide](../usage/operation.md#navigation) for realistic expectations.

## Features

* **Alternate routes** with live traffic and ETA
* **Automatic rerouting** if you drift off the planned route
* **Presets** : save Home, Work, favorites, and recent destinations
* **Remote start and cancel** from Galaxy
* **On-device turn-by-turn** instructions on your comma screen

## Galaxy vs. the comma device

Galaxy is where you search, compare routes, and manage favorites. Your comma device shows turn-by-turn guidance while you drive and runs the navigation daemon that keeps the route in sync.

Both sides stay connected — change or cancel a route from Galaxy at any time.

## Setup checklist

Navigation will not do anything until these are configured:

| Requirement | Where to set it |
| --- | --- |
| **Mapbox API key** | Galaxy → **App Keys** (Navigation keys) |
| **Use Route Desires** | Toggles → Lateral → Lateral Tuning |
| **Use Route Speed Control** | Toggles → Longitudinal → Longitudinal Tuning |

Full details are in the [settings guide](../usage/settings.md#navigation).

## Credits

Huge credit to **Chubbs** ([discountchubbs](https://github.com/discountchubbs)) for the work this is built upon much of the foundation comes from his navigation work in the community (including SunnyPilot). The StarPilot team has adapted and expanded it with Galaxy integration, rerouting, presets, traffic-aware routing, and on-device turn-by-turn.

For anyone who used the original NOO: this is the closest StarPilot has come to bringing that experience back and updated for modern models and the Galaxy workflow.
