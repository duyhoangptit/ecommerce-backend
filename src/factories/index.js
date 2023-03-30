const requireModule = require.context('./', true, /\.js$/)
requireModule.keys().forEach(fileName => {
    console.log(fileName)
})