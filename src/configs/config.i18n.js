const {I18n} = require('i18n')
const path = require("path");
const anyObject = {}

const i18n = new I18n({
    // setup some locales - other locales default to en silently
    locales: ['en', 'vi'],

    fallbackLanguage: 'en',

    // fallback from Dutch to German and from any localized German (de-at, de-li etc.) to German
    fallbacks: {
        'en-nz': 'en',
        'vi-vi': 'vi'
    },

    // you may alter a site wide default locale
    // defaultLocale: 'en',

    // will return translation from defaultLocale in case current locale doesn't provide it
    retryInDefaultLocale: false,

    // sets a custom cookie name to parse locale settings from - defaults to NULL
    cookie: 'lang',

    // sets a custom header name to read the language preference from - accept-language header by default
    header: 'accept-language',

    // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
    queryParameter: 'lang',

    // control mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
    directoryPermissions: '755',

    // watch for changes in JSON files to reload locale on updates - defaults to false
    autoReload: true,

    // whether to write new locale information to disk - defaults to true
    updateFiles: false,

    // sync locale information across all files - defaults to false
    syncFiles: false,

    // what to use as the indentation unit - defaults to "\t"
    indent: '\t',

    // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
    extension: '.json',

    // setting prefix of json files name - default to none '' (in case you use different locale files naming scheme (webapp-ecommerce-en.json), rather then just ecommerce-en.json)
    prefix: 'ecommerce-',

    // enable object notation
    objectNotation: false,

    // setting of log level DEBUG - default to require('debug')('i18n:debug')
    logDebugFn: function (msg) {
        console.log('debug', msg)
    },

    // setting of log level WARN - default to require('debug')('i18n:warn')
    logWarnFn: function (msg) {
        console.log('warn', msg)
    },

    // setting of log level ERROR - default to require('debug')('i18n:error')
    logErrorFn: function (msg) {
        console.log('error', msg)
    },

    // used to alter the behaviour of missing keys
    missingKeyFn: function (locale, value) {
        return value
    },

    // object or [obj1, obj2] to bind the i18n api and current locale to - defaults to null
    register: anyObject,

    // hash to specify different aliases for i18n's internal methods to apply on the request/response objects (method -> alias).
    // note that this will *not* overwrite existing properties with the same name
    api: {
        __: 't', // now req.__ becomes req.t
        __n: 'tn' // and req.__n can be called as req.tn
    },

    // When set to true, downcase locale when passed on queryParam; e.g. lang=en-US becomes en-us.
    // When set to false, the queryParam value will be used as passed;
    // e.g. lang=en-US remains en-US.
    preserveLegacyCase: true, // defaults to true

    // set the language catalog statically
    // also overrides locales
    // staticCatalog: {
    //     en: {
    //         /* require('en.json') */
    //     },
    //     vi: {
    //         /* require('vi.json') */
    //     }
    // },

    // use mustache with customTags (https://www.npmjs.com/package/mustache#custom-delimiters) or disable mustache entirely
    mustacheConfig: {
        tags: ['{{', '}}'],
        disable: false
    },

    // Parser can be any object that responds to .parse & .stringify
    parser: JSON,

    directory: path.join(__dirname, "locales")
})

i18n.translate = (text, ...parameters) => i18n.__(text, ...parameters)

module.exports = i18n