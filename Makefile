SHELL=/bin/bash
MAKEFLAGS += --check-symlink-times

DROPMAIL_SRC_JS  = $(shell find lib -name "*.js")
DROPMAIL_SRC_JSX = $(shell find lib -name "*.jsx")
DROPMAIL_SRC_LES = $(shell find less -name "*.less")

DROPMAIL_LIB = public/js/dropmail.js
DROPMAIL_WEB = public/js/dropmail-web.js
DROPMAIL_UI  = public/js/dropmail-ui.js
DROPMAIL_CSS = public/css/dropmail.css

color-line  = \r\033[$(1)m$(2) \033[0m$(3)\033[K
log-info    = echo -e "$(call color-line,90,   $(1),$(2))"
log-success = echo -e "$(call color-line,92,✔  $(1),$(2))"

default: install build

install: dropmail.js node_modules

update: install
	@git submodule foreach git checkout master >/dev/null 2>&1
	@git submodule foreach git pull origin master

build: $(DROPMAIL_LIB) $(DROPMAIL_UI) $(DROPMAIL_WEB) $(DROPMAIL_CSS)

quiet: build
	@echo > /dev/null

watch:
	@while :; do \
		make quiet; \
		spin=(/ - \\ \|) \
		  && next=$${spin[$$(expr $$(date +%s) % 4)]} \
			&& echo -e -n "$(call color-line,90,=> Watching for changes... $${next})"; \
		sleep 1; \
	done

clean:
	@cd $(PWD)/dropmail.js && make clean
	rm -f $(DROPMAIL_LIB) $(DROPMAIL_WEB) $(DROPMAIL_UI) $(DROPMAIL_CSS)

# resources

$(DROPMAIL_LIB): dropmail.js
	@cd $(PWD)/dropmail.js && make
	@ln -fnsv $(PWD)/dropmail.js/build/dropmail.debug.js $(PWD)/public/js/dropmail.js

$(DROPMAIL_WEB): node_modules $(DROPMAIL_SRC_JS)
	@cat $(DROPMAIL_SRC_JS) > $(DROPMAIL_WEB)

$(DROPMAIL_UI): node_modules $(DROPMAIL_SRC_JSX)
	@cat $(DROPMAIL_SRC_JSX) | ./node_modules/.bin/jsx > $(DROPMAIL_UI)

$(DROPMAIL_CSS): node_modules $(DROPMAIL_SRC_LES)
	./node_modules/.bin/lessc less/dropmail.less > $(DROPMAIL_CSS)

# dependancies

dropmail.js: submodules
	@cd $(PWD)/dropmail.js && npm install

node_modules:
	@npm install

submodules:
	@git submodule update --init
