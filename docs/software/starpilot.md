---
description: How to install StarPilot
---

# Installing StarPilot

The StarPilot install links are:

* Stable: `firestar5683/StarPilot`
* Unstable Dev: `firestar5683/Dom`

If your comma is new or already on the setup screen, skip to the instructions for your device.

If openpilot or another fork is already installed:

1. Park your car and make sure the comma has a good internet connection.
1. Open **Settings > Software**.
1. Select **Uninstall** and confirm.
1. Wait for the comma to restart and return to the setup screen.

## Comma 4

1. Choose **Custom Software** on the setup screen.
1. Connect to Wi-Fi when prompted.
1. Enter `firestar5683/StarPilot` for Stable or `firestar5683/Dom` for Unstable Dev.
1. Start the installation and let it finish. The comma may restart more than once.

Do not unplug the comma while it is installing or updating AGNOS.

## Comma 3/3X

1. Connect to Wi-Fi on the setup screen.
1. Choose to install custom software.
1. Enter `firestar5683/StarPilot` for Stable or `firestar5683/Dom` for Unstable Dev.
1. Start the installation and wait for the comma to restart.

You can power the comma inside your home with a suitable USB-C power adapter if the Wi-Fi
signal in your car is poor.

## If You Cannot Open Settings

Use this only if the comma is stuck and you cannot uninstall through **Settings > Software**.

1. Unplug the comma and wait 60 seconds.
1. Plug it back in and immediately tap the screen repeatedly until the reset prompt appears.
1. Reset the device. On Comma 4, swipe to confirm. On Comma 3/3X, tap to confirm.
1. After it returns to setup, follow the instructions above for your device.

> [!NOTE] Recommended settings page
> See [the settings page](../usage/settings.md)

> [!WARNING] Stuck on the boot logo after installing?
> See [the faq](../faq.md#im-stuck-on-the-boot-logo-screen-how-do-i-fix-it)

> [!WARNING] Other install issues
> Message us in [Discord](https://firestar.link/discord)
> or [flash your comma](https://flash.comma.ai) and retry. Make sure you try the steps above
> multiple times before resorting to flashing.

> [!TIP] Want to change settings from your phone?
> Use [the Galaxy](../usage/galaxy.md)

## Branches

StarPilot has two main branches you can install:

| Branch | Purpose | Stability |
| --- | --- | --- |
| `StarPilot` | The default branch. Use this unless you have a specific reason not to. | Stable. Recommended for everyone. |
| `Dom` | The active development branch. Changes are made to it regularly and it may break at any time. Commonly used by users who want to test new features or fixes that are still in development. | Unstable. Use at your own risk. |

### Changing branches

#### Using [Galaxy](../usage/galaxy.md) (Recommended)

1. Click Software in the sidebar
2. Show advanced options
3. Select the new branch
4. Click Switch + Update

#### Direct on device

On the **Comma 3/3X** interface:

1. Go to **Settings**.
1. Open **Software**.
1. Tap **Target Branch** and pick the branch.
1. Click **Select**.
1. Select **Yes** to download.
1. Wait for the download to finish.
1. Install the update.

On the **Comma 4** or the **Galaxy**:

1. Go to **Software**.
1. Turn on **Show advanced options**.
1. Select the branch.
1. Select **Switch + Update**.
