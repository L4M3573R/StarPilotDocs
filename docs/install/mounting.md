---
description: How to position and mount a Comma device on your windshield
---

# Mounting your Comma

Correct placement gives the road cameras a clear view, keeps driver monitoring aimed at the driver, and leaves room to service the harness and windshield trim later.

Follow the [official comma setup guide](https://comma.ai/setup) for your vehicle alongside this page.

## Before you start

Make sure you have:

* The correct mount for your device
* The included alcohol wipe or another lint-free alcohol wipe
* A clean, dry windshield
* Enough room below the rearview-mirror trim for the device and cable

> [!IMPORTANT] Use the correct mount
> Comma 4 mounts are not compatible with the Comma 3 or 3X. The standard Comma 3X mount works for most windshields, while some steep windshields require the 8-degree Comma 3X mount. Check the [comma replacement mounts page](https://comma.ai/shop/replacement-mounts) if you are unsure.

## Choose the mounting position

1. Sit in the driver's seat and locate the center of the windshield below the rearview mirror and its trim.
2. Position the mount as close to the windshield centerline as practical.
3. Make sure the top of the mount is visible from the driver's seat.
4. Leave enough space above the device to remove the rearview-mirror trim in the future.
5. Check that the device will not touch the mirror, trim, or headliner.
6. Make sure the OBD-C cable can reach the device without being pulled tight or sharply bent.

The device should face straight ahead rather than toward the driver. Do not place it far to one side of the windshield unless your vehicle's layout makes centered placement impossible.

> [!WARNING] Keep the cameras clear
> Do not place the mount over tint strips, stickers, windshield dots, cracks, or areas blocked by the mirror or trim. Check local rules for windshield-mounted equipment before choosing a position.

## Attach the mount

1. Remove the comma device from the mount before attaching the mount to the glass.
2. Clean the selected area with the alcohol wipe.
3. Let the glass dry completely. Do not touch the cleaned area afterward.
4. Check the mount's position and orientation one final time.
5. Peel the cover from the mount's adhesive.
6. Place the mount on the windshield without sliding it around.
7. Press firmly in the center, then press outward along the edges so the adhesive makes even contact without bubbles.

Take your time when positioning the mount. The adhesive is difficult to reposition cleanly after it touches the windshield.

## Attach the device

1. Slide the comma device fully onto the mount.
2. Confirm that it is seated securely and does not wobble.
3. Connect the OBD-C cable without placing sideways pressure on the device's port.
4. Route the cable so it does not block either road camera or the driver-monitoring camera.
5. Recheck the view from the driver's seat and make sure the device does not interfere with normal visibility.

Continue with [Installing your Comma device](./comma.md) if the harness and cable routing are not finished.

## After mounting

StarPilot may need to calibrate after its first installation or after the device is moved. Park the vehicle before adjusting the mount or removing the device. Never attempt to reposition the device while driving.

If calibration repeatedly fails or the displayed road view appears noticeably tilted, check that:

* The mount is level and fully attached to the glass.
* The device is fully seated on the mount.
* The device faces forward and is not angled toward the driver.
* The road cameras are not blocked by trim, tint, stickers, or dirt.
* The correct standard or 8-degree mount is being used for the windshield.

## Check your calibration with OPCal

[OPCal](https://opcal.mindflakes.com) is a community-made tool that reads the calibration data from a public comma route. It can show where your device's pitch and yaw landed within the allowed range and can scan a drive for invalid calibration messages.

Use Quick look after mounting or moving your device:

1. Complete a drive long enough for the device to calibrate.
2. Open [comma Connect](https://connect.comma.ai/) and select that drive.
3. Open More info and turn on Public access.
4. Copy the route name or the URL from your browser.
5. Open [OPCal](https://opcal.mindflakes.com).
6. Paste the route name or URL into the input.
7. Select Quick look to see the first valid calibration and its pitch and yaw position.
8. Turn off Public access in comma Connect when you are finished.

Use Full scan when calibration became invalid or changed during a drive. Full scan checks the complete route and reports an invalid calibration message along with the most recent valid calibration when one is available.

> [!NOTE] Public route access
> OPCal needs the route to be public so it can download the route logs. The processing happens in your browser. You can disable Public access again as soon as the scan finishes.

> [!TIP] Reading the result
> A valid result means the device is within openpilot's accepted calibration limits. It does not necessarily mean the mount is perfectly centered. If the result is close to a limit, the road view is visibly tilted, or calibration repeatedly becomes invalid, inspect the mount before driving again.

OPCal was created by [Nelson Chen](https://github.com/nelsonjchen) for the [Openpilot Hardware User Group](https://github.com/ophwug). Thank you to Nelson and the group for building and sharing this helpful tool with the openpilot community. The source code is available in the [OPCal GitHub repository](https://github.com/ophwug/op-calibration-reading-tool).

## Replacing or moving a mount

If you expect to move or replace the mount, consider buying fresh 3M VHB tape and an electrostatic windshield mounting film. Apply the electrostatic film to the clean windshield, then attach the mount to the film with freshly cut VHB tape. The film keeps the adhesive off the glass and can make the mount easier to remove later.

Choose an electrostatic film that is larger than the mount, trim the VHB tape to fit the mount, and make sure the entire mounting surface is secure before attaching the comma device. Check it periodically for lifting or movement, especially after large temperature changes.

> [!NOTE] Third-party mounting method
> Electrostatic film is a community mounting option and is not part of comma.ai's official installation method. If the film or adhesive does not hold the mount firmly, remove it and use a new official mount directly on the windshield.

Do not reuse damaged adhesive or install a Comma 4 on a Comma 3 or 3X mount.

Remove the device before working on the mount. Take care not to damage windshield tint, heating elements, sensors, or camera equipment near the rearview mirror. If you are unsure how to remove adhesive safely from your windshield, have an automotive glass professional remove it.
