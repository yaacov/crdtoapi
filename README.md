# CustomResourceDefinitions to OpensAPI

crdtoapi is a tool that creates an OpenAPI definitions file from kubernetes CustomResourceDefinitions.

## Quick start

Use kubernetes CRD definitions to create OpenAPI schema file.

``` bash
npm install -g crdtoapi

# add npm bin path to your PATH, or use full
# excutable path, e.g. $(npm bin)/crdtoapi
crdtoapi --help

crdtoapi -i ./examples/forklift/ -o openapi.yaml
```

## Build

Run this scripts to lint and publish the package.

``` bash
npm install
npm run lint:fix
npm run build
npm publish
```