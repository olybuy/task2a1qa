import {assert} from 'chai';
import HomePage from '../pageobjects/homepage.js';
import SearchResultPage from "../pageobjects/searchReasultPage.js";
import PrivacyPolicy from "../pageobjects/privacyPolicy.js";
import BrowserHelper from "../common/browserHelper.js";
import ConfigData from "../common/configData.js";
import TestData from "../common/testData.js";

describe('Steam', function () {

    beforeEach(async function () {
        await BrowserHelper.getWebdriver();
        await BrowserHelper.open(ConfigData.config.url);
    })

    afterEach(async function () {
        await BrowserHelper.quitBrowser();
    })

    it('Should check privacy policy', async function () {
        await HomePage.clickPrivacyPolicy();
        await BrowserHelper.switchToTab(1);
        const expectedLanguageList = TestData.data.languageList;
        const actualLanguageList = await PrivacyPolicy.getAllLanguagesList();
        assert.deepEqual(actualLanguageList, expectedLanguageList, 'NOT all languages are supported');
        const currentYear = (new Date).getFullYear();
        assert.include(await PrivacyPolicy.getPolicyDateText(), currentYear, 'Privacy Policy has NOT a current year');
    })

    it('Should find game in results of search', async function () {
        const searchName = TestData.data.gameName;
        await HomePage.fillSearchField(searchName);
        let firstGame = await SearchResultPage.getGame(1);
        let secondGame = await SearchResultPage.getGame(2);
        assert.equal(await SearchResultPage.getSearchInputValue(), searchName, 'Text in search box is WRONG');
        assert.equal(firstGame.name, searchName, 'First result is NOT a searching game');
        await SearchResultPage.fillSearchField(secondGame.name);
        assert.equal(await SearchResultPage.getSearchInputValue(), secondGame.name, 'Text in search box is WRONG');
        const resultList = await SearchResultPage.getResultObjectList();
        assert.deepInclude(resultList, secondGame, 'Second game is NOT found in result list');
        // assert.deepInclude(resultList, firstGame, 'First game is NOT found in result list');
    });
})
