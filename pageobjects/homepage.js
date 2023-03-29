import {By, Key, until} from 'selenium-webdriver';
import ConfigData from "../common/configData.js";
import BrowserHelper from "../common/browserHelper.js";

class HomePage {
    async fillSearchField(searchText) {
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('store_nav_search_term')), ConfigData.config.timeout);
        await BrowserHelper.getWebdriver().findElement(By.id('store_nav_search_term')).sendKeys(searchText);
        await BrowserHelper.getWebdriver().findElement(By.id('store_nav_search_term')).sendKeys(Key.ENTER);
    }

    async clickPrivacyPolicy() {
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.linkText("Политика конфиденциальности")), ConfigData.config.timeout);
        await BrowserHelper.getWebdriver().findElement(By.linkText("Политика конфиденциальности")).click();
    }
}

export default new HomePage();