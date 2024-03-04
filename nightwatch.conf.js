// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/
const _ = require('lodash');
const game_settings = require('./nightwatch/webgame/games');

const browser_settings = {
    safari: {
        desiredCapabilities: {
            browserName: 'safari',
            alwaysMatch: {
                acceptInsecureCerts: false
            }
        },
        webdriver: {
            start_process: true,
            server_path: ''
        }
    },

    firefox: {
        desiredCapabilities: {
            browserName: 'firefox',
            alwaysMatch: {
                acceptInsecureCerts: true,
                'moz:firefoxOptions': {
                    args: [
                        // '-headless',
                        // '-verbose'
                    ]
                }
            }
        },
        webdriver: {
            start_process: true,
            server_path: '',
            cli_args: [
                // very verbose geckodriver logs
                // '-vv'
            ]
        }
    },

    chrome: {
        globals : {
            game_key: 'yxxtkzw',
            game_name: '天空之舞',
            game_home_url: 'https://my.4399.com/yxxtkzw/'
        },

        desiredCapabilities: {
            browserName: 'chrome',
            'goog:chromeOptions': {
                // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
                //
                // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
                w3c: true,
                args: [
                    //'--no-sandbox',
                    //'--ignore-certificate-errors',
                    //'--allow-insecure-localhost',
                    //'--headless'
                ]
            }
        },

        webdriver: {
            start_process: true,
            server_path: '',
            cli_args: [
                // --verbose
            ]
        }
    },

    edge: {
        desiredCapabilities: {
            browserName: 'MicrosoftEdge',
            'ms:edgeOptions': {
                w3c: true,
                // More info on EdgeDriver: https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options
                args: [
                    //'--headless'
                ]
            }
        },

        webdriver: {
            start_process: true,
            // Follow https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp#download-microsoft-edge-webdriver
            // to download the Edge WebDriver and set the location of extracted `msedgedriver` below:
            server_path: '',
            cli_args: [
                // --verbose
            ]
        }
    },
}

const test_settings = _.reduce(game_settings,(total,cur) => {
    const {game_key} =  cur;
    total[`${game_key}_safari`] = {...browser_settings.safari,globals : cur},
    total[`${game_key}_firefox`] = {...browser_settings.firefox,globals : cur},
    total[`${game_key}_chrome`] = {...browser_settings.chrome,globals : cur},
    total[`${game_key}_edge`] = {...browser_settings.edge,globals : cur}
    return total;
},{})


module.exports = {
    // An array of folders (excluding subfolders) where your tests are located;
    // if this is not specified, the test source must be passed as the second argument to the test runner.
    src_folders: ['test', 'nightwatch/webgame'],

    // See https://nightwatchjs.org/guide/concepts/page-object-model.html
    page_objects_path: ['nightwatch/page-objects'],

    // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
    custom_commands_path: ['nightwatch/custom-commands'],
    // custom_commands_path: custom_commands_path,

    // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
    custom_assertions_path: ['nightwatch/custom-assertions'],

    // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
    plugins: ['@nightwatch/vrt'],

    // See https://nightwatchjs.org/guide/concepts/test-globals.html
    globals_path: './globals.js',

    webdriver: {},

    test_workers: {
        enabled: true
    },

    test_settings: {
        default: {
            disable_error_log: false,
            launch_url: 'http://localhost',

            screenshots: {
                enabled: false,
                path: 'screens',
                on_failure: true
            },

            desiredCapabilities: {
                browserName: 'chrome'
            },

            webdriver: {
                start_process: true,
                server_path: ''
            }
        },
        // ie: {
        //     desiredCapabilities: {
        //         browserName: 'internet explorer',
        //     },

        //     webdriver: {
        //         start_process: true,
        //         // Follow https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/?tabs=c-sharp#download-microsoft-edge-webdriver
        //         // to download the Edge WebDriver and set the location of extracted `msedgedriver` below:
        //         server_path: 'localhost:5555',
        //         cli_args: [
        //             // --verbose
        //         ]
        //     }
        // },
        ...test_settings
    },

    '@nightwatch/vrt': {
        prompt: false
    }
};
