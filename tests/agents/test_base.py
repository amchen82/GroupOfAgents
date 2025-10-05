"""Tests for the base agent module."""

import pytest

from group_of_agents.agents.base import BaseAgent


class TestAgent(BaseAgent):
    """A concrete implementation of BaseAgent for testing."""

    async def execute(self, task: str, context=None):
        """Execute a simple test task."""
        return f"Executed: {task}"


@pytest.mark.asyncio
async def test_base_agent_init(sample_agent_name, sample_config):
    """Test BaseAgent initialization."""
    agent = TestAgent(name=sample_agent_name, config=sample_config)
    assert agent.name == sample_agent_name
    assert agent.config == sample_config


@pytest.mark.asyncio
async def test_base_agent_execute(sample_agent_name):
    """Test BaseAgent execute method."""
    agent = TestAgent(name=sample_agent_name)
    result = await agent.execute("test task")
    assert result == "Executed: test task"


def test_base_agent_repr(sample_agent_name):
    """Test BaseAgent string representation."""
    agent = TestAgent(name=sample_agent_name)
    assert repr(agent) == f"TestAgent(name={sample_agent_name})"
