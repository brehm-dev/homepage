# Requirements
	Node JS
	Sass (Ruby Gem)

## start http-server
    ´´´bash
    node server.js || pm2 start --watch --name cardsite server.js
    browser-sync start -c app/config/browser-sync.js
    sass --watch --style=expanded --sourcemap=none app/sass/style.sass:public/css/style.css
    ´´´