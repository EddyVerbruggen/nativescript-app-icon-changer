import { AppIconChangeOptions, AppIconChangerApi } from './app-icon-changer.common';

export class AppIconChanger implements AppIconChangerApi {
  isSupported(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
  }

  currentAlternateIcon(): string {
    return null;
  }

  changeIcon(options: AppIconChangeOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      reject("This feature is not (yet) supported on Android.");
      return;
    });
  }
}