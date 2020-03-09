module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'movies',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#3B8070' },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },

    /*
     ** modules
     */
    modules: [
        '@nuxtjs/axios',
        // 'nuxt-lazy-load',

        ['nuxt-lazy-load', {
            // These are the default values
            images: true,
            videos: true,
            audios: true,
            iframes: true,
            polyfill: true,
            directiveOnly: false,

            // Default image must be in the static folder
            defaultImage: '/images/default-image.jpg',

            // To remove class set value to false
            loadedClass: 'isLoaded',
            appendClass: 'lazyLoad',

            observerConfig: {
                rootMargin: '50px 0px 50px 0px',
                threshold: 0
                    // See IntersectionObserver documentation
            }
        }],
    ],

    axios: {
        // proxyHeaders: false
    }
}