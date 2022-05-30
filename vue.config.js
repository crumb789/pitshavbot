module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/pitshavbot/'
      : '/',

      css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/style.scss";'
            }
        }
    }

  }