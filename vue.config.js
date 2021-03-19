module.exports = {
    publicPath: '/petfinder-vuejs/',
    devServer: {
        proxy: "http://api.petfinder.com/v2/"
    }
}