# Changelog

## [0.9.0](https://github.com/JonDotsoy/cofy/compare/q-v0.8.0...q-v0.9.0) (2024-08-19)


### Features

* add sample joke agent ([4448872](https://github.com/JonDotsoy/cofy/commit/44488727abead750afcb8cff53f06826c5735870))
* update bin.ts to handle cwd option and use it in SourcePull.from function ([edd1481](https://github.com/JonDotsoy/cofy/commit/edd1481ee33f6791a4678412d554110a287d5cdb))


### Bug Fixes

* add new message to sample agent ([e372c70](https://github.com/JonDotsoy/cofy/commit/e372c70b4a79e67a99f59be1bfb628f6892b77e3))
* add sample on agent to commit message template ([3e7c3ec](https://github.com/JonDotsoy/cofy/commit/3e7c3ecb9c91c737255f4d072891be8352a44dc2))
* update source_pull.ts to accept a custom current working directory for SourcePull.from function ([11d64f7](https://github.com/JonDotsoy/cofy/commit/11d64f7a6bcdbc624d4a06a75751de916b764394))

## [0.8.0](https://github.com/JonDotsoy/cofy/compare/q-v0.7.0...q-v0.8.0) (2024-08-18)


### Features

* add git staged diff to commit message generation ([3380685](https://github.com/JonDotsoy/cofy/commit/33806850c877fbb5cc0ae86f727c8deea59810ff))
* delete commit-messages.agent ([36772ee](https://github.com/JonDotsoy/cofy/commit/36772ee15b73582bf0946425d158385eae75875e))
* implement commit message agent ([f48862d](https://github.com/JonDotsoy/cofy/commit/f48862dcaa81d8b3a7fae9dea1c98c903eea0ea8))
* update source pull error message to use "found" instead of "find" ([ea04e3d](https://github.com/JonDotsoy/cofy/commit/ea04e3d698976616bf087af7c26d797eebfd0230))


### Bug Fixes

* remove deprecated line in bin.ts to prevent potential issues ([a157bc6](https://github.com/JonDotsoy/cofy/commit/a157bc60125c37667a9b02aa9d49ee56e73381a1))

## [0.7.0](https://github.com/JonDotsoy/q-project/compare/q-v0.6.1...q-v0.7.0) (2024-08-17)


### Features

* add source pull functionality and tests ([af9a342](https://github.com/JonDotsoy/q-project/commit/af9a3423bd073e81af01d7f2e5b35d0be62f941e))
* add support for downloading sources from URLs and caching them locally ([3f6a09e](https://github.com/JonDotsoy/q-project/commit/3f6a09e87d98e8bf2c74764e8f2188f458e2c546))
* add support for file protocol in source pull download method ([fdbcda5](https://github.com/JonDotsoy/q-project/commit/fdbcda5d1f84ba8580bf6a33747f134ea1c3fec6))
* external conversations sample `q commit-messages` ([#17](https://github.com/JonDotsoy/q-project/issues/17)) ([9b229ef](https://github.com/JonDotsoy/q-project/commit/9b229ef9c411ab37a872434cfa55ed4ac2563d2d))
* extract download logic to a separate module and remove duplicated code ([6e15e06](https://github.com/JonDotsoy/q-project/commit/6e15e06195f5afd1a04ffb135f7845a75d8a2a01))


### Bug Fixes

* update commit-messages.agent ([6cf7dc5](https://github.com/JonDotsoy/q-project/commit/6cf7dc5841a4b17e935d8feaccd066922ad1be7a))

## [0.6.1](https://github.com/JonDotsoy/q-project/compare/q-v0.6.0...q-v0.6.1) (2024-08-17)


### Bug Fixes

* update Makefile to compile bin.ts instead of index.ts ([fc9a3c4](https://github.com/JonDotsoy/q-project/commit/fc9a3c46d8b14387fe4ace9dfd8cf2a90714d54e))

## [0.6.0](https://github.com/JonDotsoy/q-project/compare/q-v0.5.0...q-v0.6.0) (2024-08-16)


### Features

* add functionality to download and resolve messages from manifest document ([222443a](https://github.com/JonDotsoy/q-project/commit/222443a05a7adc96381a82c27f37e8528a55804d))
* add message content union to manifest schema and update message object with new types ([bd869ff](https://github.com/JonDotsoy/q-project/commit/bd869ff73d1f088d07fa6d56744684874ecf3b8d))
* add new flag and feature to bin.ts for creating a new manifest document with visual editor integration ([aac65c3](https://github.com/JonDotsoy/q-project/commit/aac65c3355a0ee1f331bfba0ab4348b9a85a3605))
* add property `from` on messages to include prompts from remote sources ([#14](https://github.com/JonDotsoy/q-project/issues/14)) ([050ef38](https://github.com/JonDotsoy/q-project/commit/050ef388d91e4256a4a28786d06cb8bb83a9ab44))


### Performance Improvements

* rename index.ts to src/bin.ts and update imports ([ddcaed6](https://github.com/JonDotsoy/q-project/commit/ddcaed633bbb3b08327f1dcbb2a421fcf2eeb1bb))
* update bin.ts to load schema from correct location ([d188786](https://github.com/JonDotsoy/q-project/commit/d188786a4aaf077f8c989e2fdab360054707aa01))
* update Makefile to parse package.json version correctly ([1a41b88](https://github.com/JonDotsoy/q-project/commit/1a41b88312e502a90037f8f0cc8ddabbbbaf97fb))

## [0.5.0](https://github.com/JonDotsoy/q-project/compare/q-v0.4.0...q-v0.5.0) (2024-08-14)


### Features

* add experimental features and new option to manifest schema ([a0d84fc](https://github.com/JonDotsoy/q-project/commit/a0d84fcb1f7960ac132c7eb68c6b3b994e2ff949))
* add manifest document loading and processing capabilities with experimental features ([ce8ef2d](https://github.com/JonDotsoy/q-project/commit/ce8ef2de3d74cd4f79ada8f941b3b92984b10c33))
* add shaded agent for generating commit messages ([587fb1e](https://github.com/JonDotsoy/q-project/commit/587fb1eb808cca5c6cadc0b08ebba6fa054009ef))
* update schema.json with experimental features and new option ([4d630c9](https://github.com/JonDotsoy/q-project/commit/4d630c9d354e1f98e1fe71b80fb22a8f1eca66c6))


### Bug Fixes

* update index.ts to fix boolean type issues and improve flag handling ([fe7bb6f](https://github.com/JonDotsoy/q-project/commit/fe7bb6ffb1cf5ef7abe4815f57355af1f8128859))

## [0.4.0](https://github.com/JonDotsoy/q-project/compare/q-v0.3.0...q-v0.4.0) (2024-08-01)


### Features

* upgrade default model to llama3.1 ([2726fe2](https://github.com/JonDotsoy/q-project/commit/2726fe23997f47575b94d2ce99d58e7e2a79ae8b))
* upgrade release workflow ([ad73196](https://github.com/JonDotsoy/q-project/commit/ad7319653138ae20589e47ece9db3ab6cb90e20f))

## [0.3.0](https://github.com/JonDotsoy/q-project/compare/q-v0.2.0...q-v0.3.0) (2024-07-17)


### Features

* Improved documentation and fixed bugs in README and code files ([e2b2f1e](https://github.com/JonDotsoy/q-project/commit/e2b2f1e21cab555d4e0e0c2991663ee912381147))

## [0.2.0](https://github.com/JonDotsoy/q-project/compare/q-v0.1.2...q-v0.2.0) (2024-06-28)


### Features

* add document_id field to manifest schema ([501b383](https://github.com/JonDotsoy/q-project/commit/501b383ded02b344036e389f13ceabce5052d70d))


### Bug Fixes

* update manifest schema and id handling ([00ac171](https://github.com/JonDotsoy/q-project/commit/00ac171ad7ecd3501d255d7487d911f50ec09e90))
* update progress spin function to createProgressSpin ([37858fc](https://github.com/JonDotsoy/q-project/commit/37858fc8e853d0d2265f5873fec0fb66df6ca2ca))
* update workflow to use `urlFromRelativePath` instead of `urlByRelativePath` ([9c95b3c](https://github.com/JonDotsoy/q-project/commit/9c95b3c35dad2deb59cc43339451f5c8bb1dc4ad))

## [0.1.2](https://github.com/JonDotsoy/q-project/compare/q-v0.1.1...q-v0.1.2) (2024-06-25)


### Bug Fixes

* upgrade spin progress, prevent lost characters ([db09e76](https://github.com/JonDotsoy/q-project/commit/db09e76828f40528ad3112680a7897d6f4193247))

## [0.1.1](https://github.com/JonDotsoy/q-project/compare/q-v0.1.0...q-v0.1.1) (2024-06-24)


### Miscellaneous Chores

* release 0.1.1 ([0912af0](https://github.com/JonDotsoy/q-project/commit/0912af0a15517f3afa9d093aa73ae2bfbdaff998))

## [0.1.0](https://github.com/JonDotsoy/q-project/compare/q-v0.0.1...q-v0.1.0) (2024-06-24)


### Features

* add command execution to manifest document, allowing for dynamic output in commit messages ([e37feb0](https://github.com/JonDotsoy/q-project/commit/e37feb0655b146bd70152776eb8c991ee593aef0))
* add support to include helpper or shell helpper ([b7b730b](https://github.com/JonDotsoy/q-project/commit/b7b730bb3dde3971c925aad74b51da5e470f506e))
* initial commit ([d49862a](https://github.com/JonDotsoy/q-project/commit/d49862a0bc48e1bf752adcb860a64d0ea8026d59))
* prettier formatting update for schema.json file ([457be23](https://github.com/JonDotsoy/q-project/commit/457be2347db08a46fc74a73db7cbf48a5b197d35))


### Bug Fixes

* update manifest document to use absolute paths for file reading ([89fcc4e](https://github.com/JonDotsoy/q-project/commit/89fcc4effd923c7edbbb51b5930fddb13f7232cd))
* update stringTemplateFrom function to use substitutions instead of substitutions ([92a1503](https://github.com/JonDotsoy/q-project/commit/92a1503bc291b5a5ae750c4c26ecbf5c39b8817a))
