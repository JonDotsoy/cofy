# Project Q: Simplifying Conversational AI Development

Project Q is an open-source project that aims to simplify the process of working with artificial intelligence models, making it easier for developers and researchers to create and manage conversations using a straightforward YAML file. By providing a user-friendly interface through a text editor, Q streamlines the workflow for those working with conversational AI, eliminating the need for extensive programming knowledge or complex APIs.

The inspiration behind Project Q is the desire to make AI development more accessible to a broader range of users, from developers and researchers to students and hobbyists. By leveraging YAML files as a simple and intuitive input format, Q reduces the barrier to entry, allowing users to focus on creating innovative conversations rather than wrestling with complex code or APIs. With Project Q, you can easily create, manage, and deploy conversational AI models using a minimalistic syntax that's easy to learn and use.

**Demo**

[![demo](./assets/imgs/screen_recording_2024-06-27_2.03.20 PM.jpg)](https://youtu.be/4lEQjqxf6gU)

## Installation

To install Project Q, you can use Homebrew on macOS. Simply run the following command in your terminal:

```
brew install jondotsoy/core/q
```

Alternatively, you can install Project Q locally on any operating system.

### Local Installation

Before installing Project Q, you need to have Bun.js installed on your system. You can download and install Bun.js from the official website: https://bun.sh

**Install**

Clone the repository:

```
git clone https://github.com/JonDotsoy/q-project
```

Install dependencies:

```
make install
```

Compile the project:

```
make build
```

This will compile and prepare your local environment for running Project Q.

**Run**

After completing the installation, you can run Project Q using the following command:

```
./dist/q <manifest>
```

> Replace `<manifest>` with the path to your YAML file manifest.

## Usage

**1. Create a YAML file:**

```yaml
# manifest.yaml
messages:
  - system: |
      Hello, how are you?
  - user: |
      I'm fine, thank you.
```

**2. Run Q:**

```
q manifest.yaml
```

Q will process the YAML file and respond with a message.

**3. Specify a specific model:**

```
q --model=gemma:7b  manifest.yaml
```

Q will use the gemma:7b model specified for responding to questions.

### Arguments

- `--version`: Displays the version of Q.
- `--model`: Specifies the AI model to use.
- 🚧 `--list-models`: Lists available models.

### YAML File

The YAML file contains conversation messages. The format is:

```yaml
messages:
  - system: |
      ...
  - user: |
      ...
  - assistant: |
      ...
```

- `system`: Message sent by the bot.
- `user`: Message sent by the user.
- `assistant`: Response from the AI model.

## Manifest

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

## License

Q is licensed under MIT. The license can be found in the [./LICENSE](./LICENSE) file.

## Support

For help or questions, please open an issue on the [GitHub repository](https://github.com/JonDotsoy/q-project/issues/new).
