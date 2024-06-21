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
