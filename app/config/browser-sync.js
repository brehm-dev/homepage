module.exports = {
    port: 8080,
    proxy: 'localhost:8000',
    files: [
        './app/views/*.**',
        './public/**/*.**',
    ],
    injectChanges: true,
    notify: false,
    open: false
}
