# Changelog

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
