## Objective of this document

This document serves as a public declaration of the improvements that will be made to our project. It outlines the key milestones, goals, and timelines for the development and delivery of these enhancements.

## Roadmap

The following roadmap provides an overview of the planned features, their expected release dates, and the current status:

### 🚧 Active

<!--
| Feature | Expected Release Date |
| --- | --- |
| User Interface Updates | Q2 2023 |
| Improved Performance | Q3 2023 |
-->

| Feature | Expected Release Date |
| --- | --- |
| [New File Creation with Manifest Support](#new-file-creation-with-manifest-support) | August 2024 |

### ⏳ Planned

<!--
| Feature | Status | Expected Completion Date |
| --- | --- | --- |
| Bug Fixing | In Progress | March 15, 2023 |
| New Features Development | In Progress | April 30, 2023 |
-->

| Feature | Status | Expected Completion Date |
| --- | --- | --- |
| [Extends messages](#extends-messages) | On Progress | September 2024 |
| [Remote Prompt Support for q Command](#remote-prompt-support-for-q-command) | On Progress | September 2024 |
| [New File Creation with Manifest Support](#new-file-creation-with-manifest-support) | Done | August 2024 |
| [Dynamic Message Generation with Remote Prompts](#dynamic-message-generation-with-remote-prompts) | On Progress | August 2024 |

## Proposals

The following proposal outlines a potential feature and its expected timeline:

<!--
### Proposal: [Insert Proposal Title]

[Description]
-->

### Integración con fabric

Usar como base los prompt entregados por fabric https://github.com/danielmiessler/fabric.


### Extends messages

Implement the property `extends` to include the messages from another files local o remote.

### Remote Prompt Support for q Command

We will enhance the `q` command to support remote prompts, allowing users to execute commands using agents hosted on remote locations. This feature will be useful for developers who want to access and test agents in a shared repository or a specific branch.

The new behavior will be as follows:

* When the user executes a command like `q commit`, the application will attempt to retrieve the corresponding agent from the specified remote location (e.g., `https://raw.githubusercontent.com/JonDotsoy/q-project/develop/agents/commit.agent`).
* If the agent is found at the remote location, it will be executed as if it were a local prompt.
* If the agent is not found at the remote location, the application will fall back to searching for the corresponding agent in the user's local directory.
* This feature will support any command that can be executed by a prompt, such as `q commit`, `q deploy`, or custom commands defined by users.

By adding this new functionality, we can improve collaboration and flexibility among developers, allowing them to share and reuse agents across different environments.

### New File Creation with Manifest Support

We will add a new flag to the existing `q` command that allows users to create a new file with a manifest. This feature will provide a convenient way for developers to start a new project or component with a pre-configured manifest.

The new behavior will be as follows:

* When the user executes `q -n` (or `q --new`) without specifying any additional arguments, the application will prompt the user to enter a name for the new file.
* The user can then provide a name for the new file, and the application will create a new file with that name and a pre-configured manifest.
* If the user specifies a directory as an argument (e.g., `q -n mydir`), the new file will be created in that directory instead of the current working directory.
* The manifest will contain default configurations and settings for the new file, which can be customized by the user if needed.

By adding this new functionality, we can make it easier for developers to start new projects or components with a solid foundation.

### Dynamic Message Generation with Remote Prompts

We will introduce a new feature that allows the inclusion of dynamic messages in the `q` command, using remote prompts to fetch and incorporate content from various sources.

The new behavior will be as follows:

* Within each message scope, the `from` property can be used to specify the source of the content. This can be either a remote URL (e.g., GitHub repository) or a local file path.
* When the `q` command is executed, it will fetch the content from the specified source and include it in the corresponding message.

**Example Manifest**

```yaml
messages:
  - system:
      from: https://raw.githubusercontent.com/danielmiessler/fabric/main/patterns/create_tags/system.md
  - user:
      from: ./blogs/my-publication.md
```

In this example, the `q` command will fetch and display two messages:

1. The first message is system-wide and fetched from a remote GitHub repository.
2. The second message is intended for a specific user and fetched from a local file path.

By introducing this feature, we can make it easier to create dynamic and interactive experiences within our application.