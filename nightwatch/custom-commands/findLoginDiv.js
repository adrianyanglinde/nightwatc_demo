module.exports = {
    command: async function () {
        const loginDivVisible = await this.isVisible({
            selector: '#loginDiv',
            suppressNotFoundErrors: true
        });
        if (loginDivVisible) {
            return this;
        }
        console.log('没检测到登录弹窗有显示，开始检测是否有开始游戏按钮');
        const hasStartBtn = await this.isVisible({
            selector: '.j-startBtn',
            suppressNotFoundErrors: true
        });
        if (hasStartBtn) {
            console.log('检测到有开始游戏按钮');
            return this.click('.j-startBtn');
        }
        console.log('检测到没有开始游戏按钮，开始将控制权移交iframe');
        return this.waitForElementPresent('iframe#flash22')
            .frame('iframe#flash22')
            .click('.j-startBtn');
    }
};
