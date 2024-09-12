Allows calling [dictpopup](https://github.com/Ajatt-Tools/dictpopup) by hovering over a character and pressing `Shift` (exactly like Yomichan).

## Installation instructions
1) Go to plugins, enable developer options and load the `extension` folder as an unpacked extension
2) Edit 'extension-id' in 'allowed_origins' of `com.github.ajatt_tools.dictpopup.json` to the extension id of the imported extension from step 1)
3) Edit the path in `com.github.ajatt_tools.dictpopup.json` to point to `dictpopup_launcher.py`
4) Place `com.github.ajatt_tools.dictpopup.json` in:
    - chromium: `~/.config/chromium/NativeMessagingHosts/`
    - firefox: `~/.mozilla/native-messaging-hosts/`
