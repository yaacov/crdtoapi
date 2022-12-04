# CustomResourceDefinitions to OpensAPI

crdtoapi is a tool that creates an OpenAPI definitions file from kubernetes CustomResourceDefinitions.

## Usage

Use kubernetes CRD definitions to create OpenAPI schema file.

``` bash
npm install -g crdtoapi

# add npm bin path to your PATH, or use full
# excutable path, e.g. $(npm bin)/crdtoapi
crdtoapi --help

crdtoapi -i ./examples/forklift/ -o openapi.yaml
```

## Generate some API

``` bash
# create an OpenAPI file
crdtoapi -i ./examples/forklift/ \
  -o openapi.yaml \
  -t "Forklift API" \
  -d "Forklift migration toolkit API definitions." \
  -l "Apache-2.0" \
  --apiVersion "2.4.0" \
  --contactEmail kubev2v-dev@redhat.com


# use openapi-generator-cli: 
#   npm i -g @openapitools/openapi-generator-cli
openapi-generator-cli generate -g typescript-fetch --skip-validate-spec -o generated -i openapi.yaml
```

## Build

Run this scripts to lint and publish the package.

``` bash
npm install
npm run lint:fix
npm run build
npm publish
```