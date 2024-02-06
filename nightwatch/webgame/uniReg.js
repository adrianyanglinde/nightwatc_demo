const games = require('./games');
describe('注册测试', function () {
    beforeEach(async (browser) => {
        browser.navigateTo(games[1].home_url).waitForElementVisible('body').findLoginDiv();
    });

    it('真实身份证注册是否正常', function (browser) {
        browser
            .waitForElementVisible('#loginDiv')
            .click('#regSelector')
            .waitForElementPresent('iframe#popup_reg_frame')
            .frame('iframe#popup_reg_frame')
            .setValue('input[id=j-password]', browser.globals.reg_password)
            .setValue('input[id=j-passwordveri]', browser.globals.reg_password)
            .setValue('input[id=j-realname]', browser.globals.real_name)
            .setValue('input[id=j-idcard]', browser.globals.real_idcard)
            .click('input[id="reg_eula_agree"]')
            .click('input[type=submit]')
            .waitForElementPresent('.login_module')
            .assert.textContains('.login_module .stip strong', '注册成功')
            .frameParent();
    });

    afterEach((browser) => browser.logout().end());
});
