# CustomResourceDefinitions to Typescript models

crdtoamodel is a tool that creates Typespcript constants that contain the resource version, kind, group and other nice information from [kubernetes](https://kubernetes.io/) [CustomResourceDefinitions](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/).

## Usage

Use kubernetes CRD definitions to create typescript information constants.

``` bash
npm install --location=global crdtoapi

# add npm bin path to your PATH, or use full
# excutable path, e.g. $(npm bin --location=global)/crdtoapi
crdtomodel --help

# create typescropt constant files in ./tmp dir
mkdir tmp
crdtomodel -i ./examples/forklift/ -o ./tmp
```

Example of generated constants file, note that the color is set to `undefined` and the abbr is also uninspired,
users are encouraged to change this files.

``` ts
// Auto generated from k8s CRD file
//  see: https://github.com/yaacov/crdtoapi

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: this tool has poor color perception, you are encouraged to change the color and abbr attributes.

export const HostModel = {
  label: 'Host',
  labelPlural: 'Hosts',

  apiVersion: 'v1beta1',
  apiGroup: 'forklift.konveyor.io',
  kind: 'Host',
  plural: 'hosts',

  abbr: 'HO',
  color: undefined,
  id: 'hosts.forklift.konveyor.io',
  namespaced: true,
  crd: true,
};

export const HostModelGroupVersionKind ={
  version: 'v1beta1',
  kind: 'Host',
  group: 'forklift.konveyor.io',
};
export const HostModelRef = 'forklift.konveyor.io~v1beta1~Host';
```
