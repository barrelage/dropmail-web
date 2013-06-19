
MAKEFLAGS += --check-symlink-times

DROPMAIL_CSS = public/css/dropmail.css
DROPMAIL_CSS_TMP = $(TMPDIR)/dropmail.css
DROPMAIL_JS = public/js/dropmail.js

default: install build

install: $(DROPMAIL_JS)

update: install
	@git submodule foreach git checkout master >/dev/null 2>&1
	@git submodule foreach git pull origin master

build: $(DROPMAIL_CSS)

watch:
	@while :; do make build; sleep 1; done

$(DROPMAIL_CSS): node_modules submodules
	@./node_modules/.bin/lessc less/dropmail.less > $(DROPMAIL_CSS_TMP)
	@mv $(DROPMAIL_CSS_TMP) $(DROPMAIL_CSS)

$(DROPMAIL_JS): dropmail.js
	@cd $(PWD)/dropmail.js && make
	@ln -fnsv $(PWD)/dropmail.js/build/dropmail.debug.js $(PWD)/public/js/dropmail.js

clean:
	@cd $(PWD)/dropmail.js && make clean
	rm $(DROPMAIL_JS) $(DROPMAIL_CSS)

dropmail.js: submodules
	@cd $(PWD)/dropmail.js && npm install

node_modules:
	@npm install

submodules:
	@git submodule update --init
