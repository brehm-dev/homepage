#!/usr/bin/sh

sass /var/www/brehm.local/app/sass/style.sass /var/www/brehm.local/public/css/style.css --watch --no-source-map -s compressed
