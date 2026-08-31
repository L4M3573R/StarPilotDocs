---
status: experimental
---

# Sentry Mode

When your car is parked, Sentry Mode watches for activity around your vehicle and automatically captures events, similar in spirit to Tesla's Sentry Mode, but built for your comma device and managed through [Galaxy](../usage/galaxy.md).

The best part: it is not running the cameras all day and draining your battery. Sentry stays dormant until something actually happens.

## How it works

Sentry uses your comma device's **accelerometer** to detect movement while the vehicle is parked. The system sleeps quietly in the background and only wakes up when sustained motion is detected — for example, someone bumping your car or rocking it.

When that happens, Sentry captures camera images from the event and saves them for you to review later.

## Galaxy dashboard

Sentry is managed entirely through Galaxy. Open the **Sentry** page from the Galaxy sidebar to:

- Turn Sentry Mode on or off
- See the current status of the system
- Review your latest event (with camera captures)
- Browse past events and delete ones you no longer need
- Grab a live snapshot from both cameras while parked
- Send a test capture to confirm everything is working

Events refresh automatically while you have the page open, so you can check in from your phone without touching the comma device.

## Notifications

When Sentry detects something, you can get alerted through any combination of:

- **Browser push notifications** — enable directly from the Sentry page in Galaxy
- **ntfy** — paste your ntfy topic URL for phone notifications
- **Discord** — paste a Discord webhook URL (or any compatible webhook)

Use **Send test notification** in Galaxy to confirm your setup before you need it.

> [!TIP] iPhone users
> Add Galaxy to your Home Screen as a web app before enabling browser notifications. iOS requires a Home Screen web app for web push to work.

## Settings

All Sentry settings live on the Galaxy Sentry page — there is nothing extra to configure on the comma device itself.

| Setting | What it does |
| --- | --- |
| **Enable Sentry Mode** | Turn parked monitoring on or off |
| **Motion sensitivity** | How easily movement triggers Sentry. Lower values catch smaller bumps; higher values require stronger motion |
| **Warning persistence** | How long movement must continue before the first alert fires. Useful for filtering out brief vibrations (wind, passing trucks, etc.) |
| **Webhook URL** | Optional Discord or custom webhook for alerts |
| **ntfy URL** | Optional ntfy topic for phone alerts |

Start with the defaults and adjust sensitivity if you get too many false alerts or not enough real ones.

## What gets captured

When Sentry triggers, it saves camera images from the event along with a timestamp. You can view them in Galaxy immediately or come back to them later from the event history.

Events stay on your device until you delete them.

> [!NOTE] Power-off alerts
> If your comma device shuts down while Sentry is enabled, you may receive a power-off alert. These do not include camera images because the device is already shutting down.

> [!IMPORTANT] Sentry is for when you are parked
> Sentry only runs while your vehicle is off-road (not actively driving). It is a parking security feature, not something that runs during normal openpilot operation.
