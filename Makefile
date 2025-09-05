.PHONY: build clean test release dev copy-wasm-support

GOOS = js
GOARCH = wasm
GO_BUILD_FLAGS = -ldflags="-s -w"

build: copy-wasm-support
	GOOS=$(GOOS) GOARCH=$(GOARCH) go build $(GO_BUILD_FLAGS) -o dist/sshclient.wasm main.go
	mkdir -p public
	cp dist/sshclient.wasm public/
	cp dist/wasm_exec.js public/

copy-wasm-support:
	mkdir -p dist
	cp "$$(go env GOROOT)/lib/wasm/wasm_exec.js" dist/

clean:
	rm -rf dist/

test:
	go test ./...

dev: build
	cd example && npm install && npm run dev

release:
	goreleaser release --snapshot --clean

npm-build: build
	npm run build

npm-publish: npm-build
	npm publish