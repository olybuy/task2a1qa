import {Builder, Capabilities} from "selenium-webdriver";
import ConfigData from "./configData.js";

class BrowserHelper {
    static #WEBDRIVER = null;

    static getWebdriver() {
        if (this.#WEBDRIVER === null) {
            if (ConfigData.config.browser === 'chrome') {
                let chromeCapabilities = Capabilities.chrome();
                let chromeOptions = {
                    'args': ['--incognito']
                };
                chromeCapabilities.set('goog:chromeOptions', chromeOptions);
                this.#WEBDRIVER = new Builder().withCapabilities(chromeCapabilities).forBrowser('chrome').build();
            } else {
                this.#WEBDRIVER = new Builder().forBrowser(ConfigData.config.browser).build();
            }
        }
        return this.#WEBDRIVER;
    }

    static quitBrowser() {
        this.#WEBDRIVER.quit();
        this.#WEBDRIVER = null;
    }

    static async open(url) {
        this.getWebdriver().get(url);
    }

    static async switchToTab(index) {
        await this.getWebdriver().wait(async () =>
            (await this.getWebdriver().getAllWindowHandles()).length === index + 1, ConfigData.config.timeout
        );
        const allTabs = await this.getWebdriver().getAllWindowHandles();
        await this.getWebdriver().switchTo().window(allTabs[index]);
    }
}

export default BrowserHelper;