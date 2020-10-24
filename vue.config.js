if (process.env.NODE_ENV === "production") {
    module.exports = {
        publicPath: '/duetto'
    }
}
else {
    module.exports = {
        configureWebpack: {
            devtool: 'source-map'
        }
    }
}