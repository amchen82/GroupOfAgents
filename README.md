# GroupOfAgents

A Python framework for building multi-agent systems with Model Context Protocol (MCP) workflow support.

## Features

- 🤖 **Multi-Agent System**: Easily create and manage multiple agents working together
- 🔄 **Workflow Management**: Define complex workflows with agent coordination
- 🔌 **MCP Integration**: Built-in support for Model Context Protocol
- 🧪 **Well-Tested**: Comprehensive test coverage with pytest
- 📦 **Easy to Use**: Simple API for creating agents and workflows

## Installation

### From Source

```bash
# Clone the repository
git clone https://github.com/amchen82/GroupOfAgents.git
cd GroupOfAgents

# Install in development mode
pip install -e .

# Or install with development dependencies
pip install -e ".[dev]"
```

## Quick Start

Here's a simple example to get you started:

```python
import asyncio
from group_of_agents.agents.base import BaseAgent
from group_of_agents.workflows.base import BaseWorkflow


class MyAgent(BaseAgent):
    async def execute(self, task: str, context=None):
        return f"[{self.name}] Processed: {task}"


class MyWorkflow(BaseWorkflow):
    async def run(self, input_data, context=None):
        results = []
        for agent in self.agents:
            result = await agent.execute(input_data, context)
            results.append(result)
        return results


async def main():
    # Create agents
    agent1 = MyAgent(name="Agent-1")
    agent2 = MyAgent(name="Agent-2")
    
    # Create workflow
    workflow = MyWorkflow(name="MyWorkflow")
    workflow.add_agent(agent1)
    workflow.add_agent(agent2)
    
    # Run workflow
    results = await workflow.run("Hello, World!")
    print(results)


if __name__ == "__main__":
    asyncio.run(main())
```

For more examples, check the [examples](./examples) directory.

## Project Structure

```
GroupOfAgents/
├── src/
│   └── group_of_agents/
│       ├── agents/          # Agent implementations
│       ├── mcp/             # MCP protocol support
│       ├── workflows/       # Workflow definitions
│       └── utils/           # Utility functions
├── tests/                   # Test suite
├── examples/                # Example scripts
├── config/                  # Configuration files
└── docs/                    # Documentation
```

## Development

### Setup Development Environment

```bash
# Install development dependencies
pip install -e ".[dev]"
```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=group_of_agents --cov-report=html

# Run specific test file
pytest tests/agents/test_base.py
```

### Code Quality

```bash
# Format code with black
black src/ tests/

# Lint with ruff
ruff check src/ tests/

# Type checking with mypy
mypy src/
```

## Configuration

Configuration can be provided through:

1. **Configuration files**: See `config/default.json`
2. **Environment variables**: Copy `config/.env.example` to `.env` and update values
3. **Direct configuration**: Pass config dictionaries to agents and workflows

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Add more agent types
- [ ] Implement parallel workflow execution
- [ ] Add MCP server implementation
- [ ] Create comprehensive documentation
- [ ] Add more examples
- [ ] Performance optimizations

## Support

For questions, issues, or contributions, please open an issue on GitHub.
