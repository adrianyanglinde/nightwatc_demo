
describe('登录测试', function () {
    beforeEach(async (browser) => {
        browser.navigateTo(browser.globals.game_home_url).waitForElementVisible('body').findLoginDiv();
    });

    it('数字字母混合账号登录是否正常', function (browser) {
        browser
            .waitForElementVisible('body')
            .waitForElementPresent('#loginDiv')
            .waitForElementPresent('iframe#popup_login_frame')
            .frame('iframe#popup_login_frame')
            .setValue('input[name=username]', browser.globals.num_alpha_login_usename)
            .setValue('input[type=password]', browser.globals.num_alpha_login_password)
            .click('input[type=submit]')
            .frameParent()
            .waitForElementPresent('#xfk');
    });

    it('数字账号登录是否正常', function (browser) {
        browser
            .waitForElementVisible('body')
            .waitForElementPresent('#loginDiv')
            .waitForElementPresent('iframe#popup_login_frame')
            .frame('iframe#popup_login_frame')
            .setValue('input[name=username]', browser.globals.num_login_usename)
            .setValue('input[type=password]', browser.globals.num_login_password)
            .click('input[type=submit]')
            .frameParent()
            .waitForElementPresent('#xfk');
    });

    afterEach((browser) => browser.logout().end());
});
