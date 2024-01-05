const games = require('../games');
describe('官网测试', function () {
    beforeEach((browser) => browser.navigateTo(games[2].home_url));

    it('页面访问是否正常', function (browser) {
        browser.assert
            .screenshotIdenticalToBaseline(
                'body',
                /* Optional */ 'hxjy',
                { threshold: 0.0 },
                'VRT hxjy complete.'
            )
            .end();
    });

    afterEach((browser) => browser.end());
});
