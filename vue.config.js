if (process.env.NODE_ENV === "production") {
    module.exports = {
        publicPath: '/aoc'
    }
}
else {
    module.exports = {
        configureWebpack: {
            devtool: 'source-map'
        }
    }
}