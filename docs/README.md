# GroupOfAgents Documentation

Welcome to the GroupOfAgents documentation!

## Overview

GroupOfAgents is a Python framework for building multi-agent systems with Model Context Protocol (MCP) workflow support.

## Core Concepts

### Agents

Agents are the fundamental building blocks of the system. Each agent:
- Has a unique name and configuration
- Can execute tasks asynchronously
- Can maintain its own state
- Can communicate with other agents through workflows

### Workflows

Workflows coordinate multiple agents to accomplish complex tasks:
- Define the execution order of agents
- Pass context between agents
- Handle errors and retries
- Collect and aggregate results

### MCP (Model Context Protocol)

MCP provides a standardized way for agents to communicate with external services:
- Standardized message format
- Tool discovery and invocation
- Context sharing across agents

## Getting Started

See the [Quick Start](../README.md#quick-start) guide in the main README.

## API Reference

### BaseAgent

```python
class BaseAgent(ABC):
    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None)
    async def execute(self, task: str, context: Optional[Dict[str, Any]] = None) -> Any
```

### BaseWorkflow

```python
class BaseWorkflow(ABC):
    def __init__(self, name: str, agents: Optional[List[BaseAgent]] = None)
    def add_agent(self, agent: BaseAgent) -> None
    async def run(self, input_data: Any, context: Optional[Dict[str, Any]] = None) -> Any
```

### MCPClient

```python
class MCPClient(ABC):
    def __init__(self, endpoint: str, config: Optional[Dict[str, Any]] = None)
    async def send_message(self, message: Dict[str, Any]) -> Dict[str, Any]
    async def list_tools(self) -> List[Dict[str, Any]]
```

## Examples

Check the [examples](../examples) directory for complete working examples.

## Advanced Topics

### Custom Agent Implementation

To create a custom agent, inherit from `BaseAgent` and implement the `execute` method:

```python
from group_of_agents.agents.base import BaseAgent

class CustomAgent(BaseAgent):
    async def execute(self, task: str, context=None):
        # Your custom logic here
        return result
```

### Custom Workflow Implementation

To create a custom workflow, inherit from `BaseWorkflow` and implement the `run` method:

```python
from group_of_agents.workflows.base import BaseWorkflow

class CustomWorkflow(BaseWorkflow):
    async def run(self, input_data, context=None):
        # Your custom workflow logic here
        return results
```

## Best Practices

1. **Keep agents focused**: Each agent should have a single, well-defined responsibility
2. **Use configuration**: Externalize settings to make agents reusable
3. **Handle errors**: Implement proper error handling in agents and workflows
4. **Add logging**: Use logging to track agent execution and debug issues
5. **Write tests**: Test agents and workflows independently

## Troubleshooting

### Common Issues

**Import errors**: Make sure the package is installed with `pip install -e .`

**Async errors**: Remember to use `asyncio.run()` or `await` for async functions

**Configuration issues**: Check that your config files are valid JSON

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) for development guidelines.
