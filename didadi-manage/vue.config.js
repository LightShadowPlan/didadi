module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'api': '@/api',
                'assets': '@/assets',
                'components': '@/components',
                'i18n': '@/i18n',
                'modules': '@/modules',
                'router': '@/router',
                'store': '@/store',
                'styles': '@/styles',
                'util': '@/util',
                'views': '@/views',
            }
        }
    },
    publicPath: '/'
}