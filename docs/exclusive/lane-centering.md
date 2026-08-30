---
status: experimental
---

# Lane Centering

Lane Centering is a StarPilot feature that helps keep your vehicle centered between detected lane lines while still allowing the End-to-End (E2E) model to control the driving path.

Instead of replacing the E2E model, Lane Centering works alongside it.

## How Does Lane Centering Work?

When both lane lines are detected clearly and confidently, StarPilot compares the E2E model's predicted path with the center of the lane.

If they differ, StarPilot applies a small, smooth correction toward the lane center while still allowing the E2E model to make driving decisions.

If the lane lines become unreliable, the lane width appears abnormal, you're changing lanes, or other required conditions aren't met, StarPilot automatically falls back to the normal E2E path.

## How Can I Tell Which Direction Lane Centering Is Correcting?

When Lane Centering applies a correction, the lane line on the side it is pulling toward turns blue. This provides a visual indication of the direction Lane Centering is guiding the vehicle.

## How Do I Enable Lane Centering?

Lane Centering is enabled through StarPilot Galaxy.

1. Open Galaxy in your browser. 
2. Open Toggles.
3. Go to the Developer section.
4. Find Lane Centering and enable it.

> [!TIP]
> If you're having trouble finding the setting, in Galaxy's Toggle page, use the Search bar and search for `Lane Centering`.

Once enabled, you can also configure how Lane Centering behaves.

## What Is Lane Center Offset?

Lane Center Offset allows you to fine-tune where the vehicle sits within the lane.

For example, if you prefer the vehicle to drive slightly closer to the right side of the lane rather than directly in the center, you can adjust the offset to do so.

## What Is E2E Authority?

E2E Authority controls how much influence the E2E model has over Lane Centering.

Giving E2E more authority allows the model to deviate further from the center when it believes it should, such as when navigating around potholes or cyclists.

Increasing Lane Centering gives you a more traditional centered driving feel.

> [!IMPORTANT]
> Lane Centering does not prevent the E2E model from controlling the vehicle. It simply biases the predicted path toward the detected center of the lane when conditions allow.
