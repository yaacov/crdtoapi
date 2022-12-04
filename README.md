[![npm version](https://badge.fury.io/js/crdtoapi.svg)](https://badge.fury.io/js/crdtoapi)

# CustomResourceDefinitions to OpensAPI

crdtoapi is a tool that creates an [OpenAPI](https://www.openapis.org/) definitions file from [kubernetes](https://kubernetes.io/) [CustomResourceDefinitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

## Usage

Use kubernetes CRD definitions to create OpenAPI schema file.

``` bash
npm install --location=global crdtoapi

# add npm bin path to your PATH, or use full
# excutable path, e.g. $(npm bin --location=global)/crdtoapi
crdtoapi --help

# create an OpenAPI file
crdtoapi -i ./examples/forklift/

# create an OpenAPI file using flags
crdtoapi -i ./examples/forklift/ -o openapi.yaml \
  --title "Forklift API" \
  --description "Migration toolkit for virtualization (Forklift) API definitions." \
  --license "Apache-2.0" \
  --apiVersion "2.4.0" \
  --contactEmail "kubev2v-dev@redhat.com"
```

## Generate some API

OpensAPI comunity provide many [tools](https://openapi.tools/), for example 
`openapi-generator-cli` is a tool for auto code generation using OpenAPI definition files.

``` bash
# use openapi-generator-cli: 
#   npm i --location=global @openapitools/openapi-generator-cli
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