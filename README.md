# NativeScript App Icon Changer

[![Build Status][build-status]][build-url]
[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]
[![Twitter Follow][twitter-image]][twitter-url]

[build-status]:https://travis-ci.org/EddyVerbruggen/nativescript-app-icon-changer.svg?branch=master
[build-url]:https://travis-ci.org/EddyVerbruggen/nativescript-app-icon-changer
[npm-image]:http://img.shields.io/npm/v/nativescript-app-icon-changer.svg
[npm-url]:https://npmjs.org/package/nativescript-app-icon-changer
[downloads-image]:http://img.shields.io/npm/dm/nativescript-app-icon-changer.svg
[twitter-image]:https://img.shields.io/twitter/follow/eddyverbruggen.svg?style=social&label=Follow%20me
[twitter-url]:https://twitter.com/eddyverbruggen

<img src="https://github.com/EddyVerbruggen/nativescript-app-icon-changer/raw/master/media/demo.gif" width="338px" height="604px" />

> That's [the demo app](https://github.com/EddyVerbruggen/nativescript-app-icon-changer/tree/master/demo) in action, switching app icons like a boss!

## Installation
```bash
tns plugin add nativescript-app-icon-changer
```

## API

### requiring / importing the plugin
All examples below assume you're using TypeScript, but here's how to require the plugin with regular JS as well:

#### JavaScript
```js
var AppIconChangerPlugin = require("nativescript-app-icon-changer");
var appIconChanger = new AppIconChangerPlugin.AppIconChanger();
```

#### TypeScript
```typescript
import { AppIconChanger } from "nativescript-app-icon-changer";

export class MyClass {
  private appIconChanger: AppIconChanger;
  
  constructor() {
    this.appIconChanger = new AppIconChanger();
  }
}
```

### `isSupported`
Only iOS 10.3 and up support this feature, so you may want to check beforehand: 

```typescript
this.appIconChanger.isSupported().then(
    supported => console.log(`Supported: ${supported}`));
```


### `changeIcon`
To be able to switch to a different icon add it to `App_Resources/iOS` and `App_Resources/iOS/Info.plist` as explained below and pass `iconName` to `changeIcon`.

Note 1: iOS will notify the user the icon changed, but this plugin allows you to suppress that message (it's the default even). It's probably not what Apple would like you to do, but no apps have been disapproved with suppression enabled.

Note 2: Changing the app icon is only allowed when the app is in the foreground, so forget about that weather app which silently updates its app icon.

```typescript
this.appIconChanger.changeIcon({
  iconName: "icon-blue",
  suppressUserNotification: true
});
```

## Preparing your app for icon switching
Apple doesn't allow switching to arbitrary icons, so they must be bundled with your app before releasing the app to the store.

Add the icons you'd like your users to be able to switch to for all relevant resolutions as usual.

> Note that you DON'T NEED to provide all those resolutions; you could get away with adding just the largest resolution and refer to it in the plist file. iOS will scale it down to other resolutions for you.
 
<img src="https://github.com/EddyVerbruggen/nativescript-app-icon-changer/raw/master/media/icon-listing.png" width="236px" height="266px" />

Then reference those icons in `App_Resources/iOS/Info.plist` as well:

```xml
<plist>
<dict>

  <!-- Add or merge this bit -->
  <key>CFBundleIcons</key>
  <dict>
    <key>CFBundleAlternateIcons</key>
    <dict>
      <!-- The name you use in code -->
      <key>icon-blue</key>
      <dict>
        <key>UIPrerenderedIcon</key>
        <true/>
        <key>CFBundleIconFiles</key>
        <array>
          <!-- The actual filenames. Don't list the @2x/@3x files here -->
          <string>icon-blue-57</string>
          <string>icon-blue-60</string>
          <string>icon-blue-72</string>
          <string>icon-blue-76</string>
        </array>
      </dict>
    </dict>
  </dict>

</dict>
</plist>
```

> Need iPad support as well? Just duplicate that plist config and change `<key>CFBundleIcons</key>` to `<key>CFBundleIcons~ipad</key>`.

Want to see this configured in an actual project? Look at [the demo app](https://github.com/EddyVerbruggen/nativescript-app-icon-changer/tree/master/demo/app/App_Resources/iOS) to see the gory details.
