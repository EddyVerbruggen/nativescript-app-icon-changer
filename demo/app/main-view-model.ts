import {Observable} from 'data/observable';
import {AppIconChanger} from 'nativescript-app-icon-changer';

export class HelloWorldModel extends Observable {
  private appIconChanger: AppIconChanger;
  public showFeedback: boolean = true;

  constructor() {
    super();
    this.appIconChanger = new AppIconChanger();
  }

  public changeIconRed(): void {
    this.changeIcon('icon-red');
  }

  public changeIconBlue(): void {
    this.changeIcon('icon-blue');
  }

  public changeIconGreen(): void {
    this.changeIcon('icon-green');
  }

  public changeIconYellow(): void {
    this.changeIcon('icon-yellow');
  }

  public changeIconPurple(): void {
    this.changeIcon('icon-purple');
  }

  public changeIconDefault(): void {
    this.changeIcon('icon');
  }

  private changeIcon(name: string): void {
    this.appIconChanger.changeIcon({
      iconName: name,
      suppressUserNotification: !this.showFeedback // default true
    }).then(() => {
      console.log(`Icon changed to ${name}.`);
    }, (error: any) => {
      console.log(`Error code: ${error.code}`);
      console.log(`Error message: ${error.message}`);
    });
  }
}