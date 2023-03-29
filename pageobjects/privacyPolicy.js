import {By, until} from 'selenium-webdriver';
import ConfigData from "../common/configData.js";
import BrowserHelper from "../common/browserHelper.js";

class PrivacyPolicy {
    async getAllLanguagesList() {
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('languages')), ConfigData.config.timeout);
        const languagesUrlArr = await BrowserHelper.getWebdriver().findElements(By.xpath("//*[@id='languages']/a"));
        const languagesArr = [];
        for (let element of languagesUrlArr) {
            let url = await element.getAttribute('href');
            let linkArr = url.split('/');
            languagesArr.push(linkArr[linkArr.length - 2]);
        }
        return languagesArr;
    }

    async getPolicyDateText() {
        await BrowserHelper.getWebdriver().wait(
            until.elementLocated(By.xpath("//*[text()[contains(.,'Дата редакции')]]")), ConfigData.config.timeout
        );
        return await BrowserHelper.getWebdriver().findElement(By.xpath("//*[text()[contains(.,'Дата редакции')]]")).getText();
    }
}

export default new PrivacyPolicy();