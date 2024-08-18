# Project Cofy: Simplifying Conversational AI Development

Project Cofy is an open-source project that aims to simplify the process of working with artificial intelligence models, making it easier for developers and researchers to create and manage conversations using a straightforward YAML file. By providing a user-friendly interface through a text editor, Cofy streamlines the workflow for those working with conversational AI, eliminating the need for extensive programming knowledge or complex APIs.

The inspiration behind Project Cofy is the desire to make AI development more accessible to a broader range of users, from developers and researchers to students and hobbyists. By leveraging YAML files as a simple and intuitive input format, Cofy reduces the barrier to entry, allowing users to focus on creating innovative conversations rather than wrestling with complex code or APIs. With Project Cofy, you can easily create, manage, and deploy conversational AI models using a minimalistic syntax that's easy to learn and use.

**Demo**

[![demo](./assets/imgs/screen_recording_2024-06-27_2.03.20 PM.jpg)](https://youtu.be/4lEQjqxf6gU)

**Content**

- [Installation](#installation)
- [Usage](#usage)
- [Manifest File Format](#manifest-file-format)
- [Examples](#examples)

## Installation

To install Project Cofy, you can use Homebrew on macOS. Simply run the following command in your terminal:

```
brew install jondotsoy/core/cofy
```

Alternatively, you can install Project Cofy locally on any operating system.

### Local Installation

Before installing Project Cofy, you need to have Bun.js installed on your system. You can download and install Bun.js from the official website: https://bun.sh

**Install**

Clone the repository:

```shell
git clone https://github.com/JonDotsoy/cofy.git
```

Install dependencies:

```shell
make install
```

Compile the project:

```shell
make build
```

This will compile and prepare your local environment for running Project Cofy.

## Usage

### 1. Create a YAML file:

The manifest file, named `manifest.yaml`, should contain the following structure:

```yaml
# manifest.yaml
messages:
  - system: |
      Hello, how are you?
  - user: |
      I'm fine, thank you.
  - assistant: |
      Nice to meet you!
```

This file defines the conversation flow and context for Project Cofy.

### 2. Run Cofy:

After creating the `manifest.yaml` file, you can run Project Cofy using the following command:

```shell
cofy manifest.yaml
```

Cofy will process the YAML file and respond with a message based on the defined conversation flow.

### 3. Specify a specific model:

To use a specific AI model, such as gemma:7b, specify it in the command like this:

```shell
cofy --model=gemma:7b manifest.yaml
```

Cofy will use the specified model for responding to questions.

### Arguments

- `--version`: Displays the version of Cofy.
- `--model`: Specifies the AI model to use.

**Note:** The flag `--list-models` may not work as expected. To list available models, please run `ollama list` instead.

## Examples

You can also use Project Cofy with pre-defined conversations from the repository. For example:

*   Run `cofy commit-messages` to generate a message for the latest commit on the repository.
    *   The command will download the conversation agent from https://raw.githubusercontent.com/JonDotsoy/cofy-project/HEAD/agents/commit-messages.agent and execute it locally.

## Manifest File Format

The manifest file, named `manifest.yaml`, should contain the following structure:

```yaml
# manifest.yaml
messages:
  - system: |-
      ...
  - user: |-
      ...
  - assistant: |-
      ...
```

### Messages

- `system`: Message sent by the bot.
- `user`: Message sent by the user.
- `assistant`: Response from the AI model.

### Context

> 🚧 Work on progress

You can store context information in your YAML file using the following syntax:

```yaml
context:
  previous_question: What is your name?
```

Context information helps the AI model keep track of the conversation history and provide more accurate responses.

### Embedding Content

You can embed the content of another document into your manifest YAML file using `{{include <ruta del archivo>}}`. For example:

```yaml
messages:
  - system: |
      {{include "./hello.txt"}}
```

This will insert the contents of `hello.txt` into the conversation.

### Executing Commands

You can also embed the output of a command execution into your manifest YAML file using `{{$ command}}`. For example:

```yaml
messages:
  - system: |
      {{$ 'ls -l | grep *.txt'}}
```

This will execute the `ls -l` command and embed the output, filtering only files with `.txt` extensions.

## Extending Manifest Files

> 🚧 Experimental feature

The manifest file can have a property `extends` that includes messages in this file. This feature is experimental.

```yaml
# manifest.yaml
extends: ./messages_extends.yaml
```

This will include all messages defined in `./messages_extends.yaml`.

## License

Cofy is licensed under MIT. The license can be found in the [./LICENSE](./LICENSE) file.

## Support

For help or questions, please open an issue on the [GitHub repository](https://github.com/JonDotsoy/cofy-project/issues/new).
