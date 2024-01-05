module.exports = {
    command: async function () {
        return this.execute(() => {
            UniLogin.logout();
        });
    }
};
