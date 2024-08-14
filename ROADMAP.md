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

