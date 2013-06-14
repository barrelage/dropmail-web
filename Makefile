
DROPMAIL = public/css/dropmail.css
DROPMAIL_LESS = less/dropmail.less
CHECK = \033[32m✔\033[39m

default: install build

install:
	@printf "Updating submodules...                                  "
	@git submodule init   >/dev/null
	@git submodule update >/dev/null
	@echo "${CHECK} Done"

build:
	@printf "Compiling CSS...                                        "
	@./node_modules/.bin/lessc ${DROPMAIL_LESS} > ${DROPMAIL}
	@echo "${CHECK} Done"

watch:
	@echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"
