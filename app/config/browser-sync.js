module.exports = {
    port: 8080,
    proxy: 'http://localhost:8000',
    files: [
        './app/**/**/**/*.**',
        './public/**/**/**/*.**',
    ],
    injectChanges: true,
    notify: false,
    open: false,
    ui: false
}
