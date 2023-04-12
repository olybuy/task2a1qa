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
        const element =  await BrowserHelper.getWebdriver().findElement(By.xpath('//*[@id="footer_text"]/div[2]/a[1]'));
        console.log('element is: ' + element)
        await BrowserHelper.scroll(element);
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.xpath('//*[@id="footer_text"]/div[2]/a[1]')), ConfigData.config.timeout);
        await element.click();
    }
}

export default new HomePage();