export interface AppIconChangeOptions {
  /**
   * The name of the file in App_Resources/iOS,
   * which is also listed in your App_Resources/iOS/Info.plist file.
   */
  iconName: string;

  /**
   * Suppress the alert iOS shows when the icon is changed.
   * Default: true
   */
  suppressUserNotification?: boolean;
}

export interface AppIconChangerApi {
  isSupported(): Promise<boolean>;
  changeIcon(options: AppIconChangeOptions): Promise<any>;
  currentAlternateIcon(): string;
}