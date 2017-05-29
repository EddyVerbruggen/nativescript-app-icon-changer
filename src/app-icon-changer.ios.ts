import { AppIconChangeOptions, AppIconChangerApi } from './app-icon-changer.common';
import * as application from "application";
import { topmost } from "tns-core-modules/ui/frame";

export class AppIconChanger implements AppIconChangerApi {
  _supportsAlternateIcons(): boolean {
    // available since iOS 10.3
    return application.ios.nativeApp.supportsAlternateIcons();
  }

  _suppressUserNotification(): void {
    const suppressAlertVC = UIViewController.new();
    topmost().ios.controller.presentViewControllerAnimatedCompletion(
        suppressAlertVC,
        false,
        () => suppressAlertVC.dismissViewControllerAnimatedCompletion(false, null));
  }

  isSupported(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this._supportsAlternateIcons());
    });
  }

  changeIcon(options: AppIconChangeOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject("This version of iOS doesn't support alternate icons");
        return;
      }

      if (!options.iconName) {
        reject("The 'iconName' parameter is mandatory");
        return;
      }

      // note that this icon must be listed in the app's plist
      application.ios.nativeApp.setAlternateIconNameCompletionHandler(
          options.iconName,
          (error? : NSError) => {
            if (error !== null) {
              reject({
                code: error.code,
                message: error.localizedDescription
              });
            } else {
              resolve();
            }
          });

      if (options.suppressUserNotification !== false) {
        this._suppressUserNotification();
      }
    });
  }
}