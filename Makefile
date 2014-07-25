WEBPACK_BIN = node ./node_modules/webpack/bin/webpack.js

default: install build

install: node_modules submodules

build:
	@$(WEBPACK_BIN) --colors --progress --optimize-minimize
	@npm shrinkwrap

bundle:
	@$(WEBPACK_BIN) --optimize-minimize --optimize-dedupe --colors --progress
	@npm shrinkwrap

clean:
	@rm -f public/bundle/*

server:
	@node server.js

watch:
	@$(WEBPACK_BIN) -d --progress --colors --watch --debug

# dependencies

node_modules:
	@npm install

submodules:
	@git submodule init
	@git submodule update

.PHONY: install clean build
