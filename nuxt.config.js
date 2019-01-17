module.exports = {
    router: {
        middleware: 'auth'
    },
    env: {
        baseUrl: './',
    },
    mode: 'spa',
    srcDir: 'src/',
    build: {
        babel: {

        }
    },
    css: [
        '@/styles/styles.scss',
    ],
    build: {
    },
    plugins: [
        '~/plugins/main.js',

    ],
}   