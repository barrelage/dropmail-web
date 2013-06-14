
MAKEFLAGS += --check-symlink-times

DROPMAIL_CSS = public/css/dropmail.css
DROPMAIL_JS = public/js/dropmail.js

default: install build

install: $(DROPMAIL_JS)

build: $(DROPMAIL_CSS)

$(DROPMAIL_CSS): node_modules submodules
	@./node_modules/.bin/lessc less/dropmail.less > $(DROPMAIL_CSS)

$(DROPMAIL_JS): dropmail.js
	ln -fnsv $(PWD)/dropmail.js/build/dropmail.js $(PWD)/public/js/dropmail.js

dropmail.js: submodules

node_modules:
	@npm install

submodules:
	@git submodule update --init
