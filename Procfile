api: cd vendor/dropmail-api && bundle exec guard -g server
smtp: cd vendor/dropmail-api && bundle exec mailcatcher
web: ./node_modules/.bin/supervisor -w "server,server.js" -e "node|js|json" ./server.js
