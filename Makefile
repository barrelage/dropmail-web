DROPMAIL = public/css/dropmail.css
DROPMAIL_LESS = less/dropmail.less
CHECK=\033[32m✔\033[39m

default: install build

install:
	@echo "Updating submodules...                                  ${CHECK} Done"
	@git submodule init
	@git submodule update

build:
	@echo "Compiling CSS...                                        ${CHECK} Done"
	@./node_modules/.bin/lessc ${DROPMAIL_LESS} > ${DROPMAIL}

watch:
	@echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make' }"

