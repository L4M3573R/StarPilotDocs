# How to Set Up Long on Some HDA2 Vehicles

This is how to set up long on:

* Ioniq 6 HDA2 2023-2025
* EV9 HDA2 2024-2026
* Ioniq 5 2026 HDA2

## First-Time Things to Toggle

1. Toggle on `Disable Automatic Fingerprint Detection` in
   `Settings > StarPilot > Vehicle Settings`.
2. Set `Car Make` to `Hyundai`.
3. Set `Car Model` to your car model. In my instance, this is
   `Hyundai Ioniq 6 (with HDA II) 2023-2024`.
4. Toggle on `openpilot Longitudinal Control (Alpha)` in `Settings > Developer`.

## Every-Time Startup Procedure

1. Make sure the car is off.
2. Keep your foot off the brake.
3. Press the start button twice.
4. Wait for the comma to fully turn on to an onroad state.
5. Wait for the cruise-control indicator on the dash to show `--- MPH` or `HDA 25`.
6. Push the brake pedal down.
7. Hit the start button once.

Long should be enabled now!

## Engaging Long After You See `--- MPH/KPH`

Our wheel controls are slightly different from other forks:

* LKAS button = Always on Lateral (M.A.D.S.)
* Cruise button = Always on Lateral (M.A.D.S.)
* Cruise knob down = Activate long at the current speed
* Cruise knob in = Deactivate long
* Cruise knob up = Turn long back on at the previously set speed

After it's engaged:

* Cruise knob down = Lower the max-speed threshold
* Cruise knob up = Raise the max-speed threshold

## Troubleshooting

If the `openpilot Longitudinal Control (Alpha)` toggle is grayed out, try one of these:

1. Restart the comma.
2. Turn off the car, turn off the comma, and wait for the comma to shut off completely.
   Then go through the every-time startup procedure again.
