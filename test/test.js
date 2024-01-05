describe('test suit 1', function () {
    before((browser) => {
        console.log('test before');
    });

    beforeEach((browser) => {
        browser.navigateTo('https://my.4399.com/yxqjz/');
        browser.waitForElementVisible('body');
        console.log('test beforeEach');
    });

    it('test case 1', function (browser) {
        console.log('globals', browser.globals.delay_milliseconds); // myGlobalVar == "some value"
    });

    afterEach((browser) => {
        console.log('test afterEach');
        browser.end();
    });

    after((browser) => {
        console.log('test after');
    });
});
