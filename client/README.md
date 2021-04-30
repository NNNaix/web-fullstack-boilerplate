# Packages

This directory contains the code for the application frontend. This document gives an overview of the directory structure, and ongoing refactorings.

For more information on developing for the frontend:

## Central folders of application's frontend

| folder         | description                                                                                                                                                                                                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /app/component | A mix of third-party components and components we have implemented ourselves, all component that are used in multiple route page.                                                                                                         |
| /app/infra     | The infrastructure code of application which means may only use once.                                                                                                                                                                     |
| /app/routes    | All page level components that need to match the route, with it's own child component in the same directory                                                                                                                               |
| /app/services  | This is where responsible for communicating with BFF domain service.                                                                                                                                                                      |
| /app/store     | This is where responsible for persisting domain objects and manage the relationship between domain objects.                                                                                                                               |
| /app/types     | The global typescript definition shared in codebase.                                                                                                                                                                                      |
| /app/util      | Small helper functions that are used in multiple parts of the codebase. Many functions are placed directly in the util folders which is something we want to avoid. Its better to give the util function a more descriptive package name. |

## Technology Stack

- [React](https://reactjs.org/) - UI Engine Library
- [Ant Design](https://ant.design/index-cn) - Component Library
- [Mobx-State-Tree](https://mobx-state-tree.js.org/intro/welcome) - State Store Library
- [Typescript](https://www.typescriptlang.org/) - Type System
