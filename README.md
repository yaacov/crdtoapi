[![npm version](https://badge.fury.io/js/crdtoapi.svg)](https://badge.fury.io/js/crdtoapi)

# CustomResourceDefinitions to OpensAPI

crdtoapi are a collection of tools that auto generate Typescript interfaces and constants out of [OpenAPI](https://www.openapis.org/)  and [kubernetes](https://kubernetes.io/) [CustomResourceDefinitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) files.

Tools:

| Name | description |
|------|-------------|
| [crdtoapi](./README.crdtoapi.md) | tool to genrate OpenAPI definition files out of Kubernetes CRDs |
| [crdtomodel](./README.crdtomodel.md) | tool to genrate Typescropt constants out of Kubernetes CRDs |
| [crdtotypes](./README.crdtotypes.md) | tool to genrate Typescropt interfaces out of OpenAPI definitions |


## Install


``` bash
npm install --location=global crdtoapi
```

```

## Build

Run this scripts to lint and publish the package.

``` bash
npm install
npm run lint:fix
npm run build
npm publish
```
