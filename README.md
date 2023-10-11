[![npm version](https://badge.fury.io/js/crdtoapi.svg)](https://badge.fury.io/js/crdtoapi)

# `crdtoapi`: From CustomResourceDefinitions to TypeScript API

Welcome to crdtoapi - a powerful suite of tools designed to effortlessly convert [OpenAPI](https://www.openapis.org/) and [kubernetes](https://kubernetes.io/) [CustomResourceDefinitions (CRDs)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) into TypeScript interfaces and constants. Streamline your development process by automating the generation of TypeScript definitions directly from CRD files, saving time and minimizing potential errors.

## Overview

The evolution of applications and services in the Kubernetes ecosystem has resulted in the need for precise and consistent TypeScript typings. With crdtoapi, developers can ensure type accuracy without the repetitive task of manual definition writing. Dive into our tools to understand how you can benefit from them.

### Tools Included:

  1. **`crdtoapi`**  
  **Description:** Generate OpenAPI definition files directly from Kubernetes CustomResourceDefinitions.  
  [Learn more](./README.crdtoapi.md)

  2. **`crdtomodel`**  
    **Description:** Craft TypeScript constants seamlessly from Kubernetes CustomResourceDefinitions.  
    [Learn more](./README.crdtomodel.md)

  3. **`crdtotypes`**  
    **Description:** Transform OpenAPI definitions into robust TypeScript interfaces.  
    [Learn more](./README.crdtotypes.md)

### Key Features:

  - Automated TypeScript Definition Generation: Eliminate manual errors and save time by automating the conversion process.
  - Compatibility with OpenAPI & Kubernetes: Designed specifically for OpenAPI and Kubernetes CRD structures.
  - Easy Integration: Integrate with existing projects or use as a standalone tool for TypeScript development in Kubernetes environments.

## Getting Started:

Whether you're a seasoned Kubernetes pro or just venturing into the world of OpenAPI, `crdtoapi` is tailored to offer an intuitive and developer-friendly experience. To make the most of our tools, we recommend starting with the individual `README` files for each tool. These documents will guide you through setup instructions, usage guidelines, and practical examples.

## Installation

You can easily install `crdtoapi` globally using npm:

``` bash
npm install --location=global crdtoapi
```

  Note: The `--location=global` flag ensures that you install the package globally, making the tools accessible from anywhere in your terminal.


## Building from Source

If you wish to contribute or build the project from source, follow these steps to lint, build, and publish the package:

1. Clone the repository and navigate to its directory.
2. Install the required dependencies:

```bash
npm install
```

3. Lint and fix any potential issues:

```bash
npm run lint:fix
```

4. Build the package:

```bash
npm run build
```

5. Finally, if you have the necessary permissions, publish the package:

```bash
npm publish
```
