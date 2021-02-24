.PHONY: all
all: manifest.json

%.json: %.jsonnet
	jsonnet $< > $@
