SHELL=/bin/bash
MAKEFLAGS += --check-symlink-times

# submodules

DM_API = vendor/dropmail-api
DM_JS  = vendor/dropmail.js

# sources

SRC_UI  = $(shell find lib -name "*.jsx")
SRC_WEB = $(shell find lib -name "*.js")
SRC_LIB = $(PWD)/$(DM_JS)/build/dropmail.js
SRC_VEN = $(shell find vendor/js -name "*.js")
SRC_LES = $(shell find less -name "*.less")

# targets

APP     = build/js/app.js
APP_UI  = build/js/app/ui.js
APP_WEB = build/js/app/web.js
LIB     = build/js/dropmail.js
VEN     = build/js/vendor.js
CSS     = build/css/app.css

APP_MIN = $(APP:.js=.min.js)
LIB_MIN = $(LIB:.js=.min.js)
VEN_MIN = $(VEN:.js=.min.js)
CSS_MIN = $(CSS:.css=.min.css)

# helpers

color-line  = \r\033[$(1)m$(2) \033[0m$(3)\033[K
log-info    = echo -e "$(call color-line,90,   $(1),$(2))"
log-success = echo -e "$(call color-line,92,✔  $(1),$(2))"

default: install build

install: node_modules submodules

update: install
	@git submodule foreach git checkout master
	@git submodule foreach git pull origin master

build: $(APP_MIN) $(LIB_MIN) $(VEN_MIN) $(CSS)

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
	@cd $(DM_JS) && make clean
	@rm -f $(shell find build -name "*.css" -o -name "*.js")

# targets

$(APP_MIN): $(APP)
	@./node_modules/.bin/uglifyjs $^ > $@

$(APP): $(APP_LIB) $(APP_UI) $(APP_WEB)
	@cat $^ > $@

$(APP_UI): $(SRC_UI)
	@cat $^ | ./node_modules/.bin/jsx > $@

$(APP_WEB): $(SRC_WEB)
	@cat $^ > $@

$(VEN_MIN): $(VEN)
	@./node_modules/.bin/uglifyjs $^ > $@

$(VEN): $(SRC_VEN)
	@cat $^ > $@

$(LIB_MIN): $(LIB)
	@./node_modules/.bin/uglifyjs $^ > $@

$(LIB): $(SRC_LIB)
	@ln -fns $(SRC_LIB) $@

$(CSS): $(SRC_LES)
	@./node_modules/.bin/lessc less/dropmail.less > $@

# dependencies

$(SRC_LIB):
	@cd $(DM_JS) && make quiet

node_modules:
	@npm install

submodules:
	@git submodule update --init
	@cd $(DM_API) && bundle
	@cd $(DM_JS) && make install
