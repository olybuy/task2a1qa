import {By, Key, until} from 'selenium-webdriver';
import ConfigData from "../common/configData.js";
import BrowserHelper from "../common/browserHelper.js";

class SearchResultPage {
    async fillSearchField(searchText) {
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('store_nav_search_term')), ConfigData.config.timeout);
        await BrowserHelper.getWebdriver().findElement(By.id('store_nav_search_term')).sendKeys(searchText);
        await BrowserHelper.getWebdriver().findElement(By.id('store_nav_search_term')).sendKeys(Key.ENTER);
    }

    async getSearchInputValue() {
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('term')), ConfigData.config.timeout);
        return await BrowserHelper.getWebdriver().findElement(By.id('term')).getAttribute("value");
    }

    async getGame(index) {

        let gameObject = {
            name: "",
            platforms: [],
            releaseDate: "",
            review: "",
            price: ""
        }

        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('search_resultsRows')), ConfigData.config.timeout);
        const gameResultRow = await BrowserHelper.getWebdriver().findElement(By.xpath(`//*[@id='search_resultsRows']/a[${index}]`));

        gameObject.name = await this.getGameName(gameResultRow);
        gameObject.platforms = await this.getPlatforms(gameResultRow);
        gameObject.releaseDate = await this.getReleaseDate(gameResultRow);
        gameObject.review = await this.getReviewResults(gameResultRow);
        gameObject.price = await this.getGamePrice(gameResultRow);

        return gameObject;
    }

    async getPlatforms(gameResultRow) {
        const platforms = await gameResultRow.findElements(By.xpath(".//span[contains(@class, 'platform_img')]"));
        const platformsArr = [];
        for (let elem of platforms) {
            let str = await elem.getAttribute('class');
            let stringArr = str.split(" ");
            platformsArr.push(stringArr[1])
        }
        return platformsArr;
    }

    async getReviewResults(gameResultRow) {
        const reviewResult = await gameResultRow.findElement(By.xpath(".//div[contains(@class, 'search_reviewscore')]"));
        let reviewValue;
        try {
            await reviewResult.findElement(By.xpath("./span"));
            reviewValue = await reviewResult.findElement(By.xpath("./span")).getAttribute('class');
            let stringArr = reviewValue.split(" ");
            reviewValue = stringArr[1];
        } catch (e) {
            reviewValue = "has no review";
        }
        return reviewValue;
    }

    async getGameName(gameResultRow) {
        return await gameResultRow.findElement(By.xpath(".//span[contains(@class, 'title')]")).getText();
    }

    async getReleaseDate(gameResultRow) {
        return await gameResultRow.findElement(By.xpath(".//div[contains(@class, 'search_released')]")).getText();
    }

    async getGamePrice(gameResultRow) {
        return await gameResultRow.findElement(By.xpath(".//div[contains(@class, 'search_price')]")).getText();
    }

    async getResultObjectList() {
        const resultObjArr = [];
        await BrowserHelper.getWebdriver().wait(until.elementLocated(By.id('search_resultsRows')), ConfigData.config.timeout);
        const gameResultRow = await BrowserHelper.getWebdriver().findElements(By.xpath(`//*[@id='search_resultsRows']/a`));
        for (let i = 1; i <= gameResultRow.length; i++) {
            let obj = await this.getGame(i);
            resultObjArr.push(obj);
        }
        return resultObjArr;
    }
}

export default new SearchResultPage();
