# Project Q

Q is a project designed to facilitate conversations with artificial intelligence models. It allows users to create and manage conversations using a simple YAML file.

## Installation

```
brew install jondotsoy/core/q
```

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

## Local Deployment

1. Install dependencies:

```
bun install
```

2. Compile the project:

```
bun build --compile index.ts --outFile q
```

3. Run Q:

```
./q <manifest>
```

## License

Q is licensed under MIT. The license can be found in the [./LICENSE](./LICENSE) file.

## Support

For help or questions, please open an issue on the [GitHub repository](https://github.com/JonDotsoy/q-project/issues/new).
