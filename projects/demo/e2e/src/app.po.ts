import { browser, by, element } from 'protractor';
import { ElementFinder } from 'protractor/built/element';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getRoot(): ElementFinder {
    return element(by.css('<router-outlet>'));
  }
}
