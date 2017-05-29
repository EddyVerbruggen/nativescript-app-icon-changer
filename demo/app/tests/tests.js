var AppIconChanger = require("nativescript-app-icon-changer").AppIconChanger;
var appIconChanger = new AppIconChanger();

describe("changeIcon", function() {
  it("exists", function() {
    expect(appIconChanger.changeIcon).toBeDefined();
  });

  it("returns a promise", function() {
    expect(appIconChanger.changeIcon()).toEqual(jasmine.any(Promise));
  });
});