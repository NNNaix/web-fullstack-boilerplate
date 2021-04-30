# Packages

This directory contains the code for the application backend. This document gives an overview of the directory structure, and ongoing refactorings.

For more information on developing for the backend:

## Central folders of application's backend

| folder  | description                                                                                                                                                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /infra  | Modules in infra should be modules that are used in multiple places in application without knowing anything about the application domain.                                                                                                 |
| /models | This is where we keep our domain model. This package should not depend on any package outside standard library. It does contain some references within application but that is something we should avoid going forward.                   |
| /util   | Small helper functions that are used in multiple parts of the codebase. Many functions are placed directly in the util folders which is something we want to avoid. Its better to give the util function a more descriptive package name. |
