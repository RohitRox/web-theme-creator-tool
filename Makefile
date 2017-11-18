theme:
	./sh/make_theme.sh $(name)
remove:
	./sh/remove_theme.sh $(name)
clean:
	rm -rf ./build/*.html
	rm -rf ./build/javascripts/*.js
	rm -rf ./build/stylesheets/*.css
build:
	yarn build
.PHONY: build
