
describe('官网测试', function () {
    beforeEach((browser) => browser.navigateTo(browser.globals.game_home_url));

    it('页面访问是否正常', function (browser) {
        browser.assert
            .screenshotIdenticalToBaseline(
                'body',
                /* Optional */ browser.globals.game_key,
                { threshold: 0.5 },
                'VRT hxjy complete.'
            )
            .end();
    });

    afterEach((browser) => browser.end());
});
