module.exports = {
    publicPath: '/',
    devServer: {
        proxy: "http://api.petfinder.com/v2/"
    }
}