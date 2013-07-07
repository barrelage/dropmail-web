api: sh -c 'cd vendor/dropmail-api && BUNDLE_GEMFILE="$(pwd)/Gemfile" && bundle exec puma -p 9393'
web: sh -c './node_modules/.bin/supervisor -e "node|js|json" ./server.js'
