"""Tests for the base workflow module."""

import pytest

from group_of_agents.agents.base import BaseAgent
from group_of_agents.workflows.base import BaseWorkflow


class TestAgent(BaseAgent):
    """A concrete implementation of BaseAgent for testing."""

    async def execute(self, task: str, context=None):
        """Execute a simple test task."""
        return f"Executed: {task}"


class TestWorkflow(BaseWorkflow):
    """A concrete implementation of BaseWorkflow for testing."""

    async def run(self, input_data, context=None):
        """Run a simple test workflow."""
        results = []
        for agent in self.agents:
            result = await agent.execute(str(input_data))
            results.append(result)
        return results


def test_workflow_init():
    """Test BaseWorkflow initialization."""
    workflow = TestWorkflow(name="TestWorkflow")
    assert workflow.name == "TestWorkflow"
    assert len(workflow.agents) == 0


def test_workflow_add_agent():
    """Test adding agents to workflow."""
    workflow = TestWorkflow(name="TestWorkflow")
    agent = TestAgent(name="Agent1")
    workflow.add_agent(agent)
    assert len(workflow.agents) == 1
    assert workflow.agents[0] == agent


@pytest.mark.asyncio
async def test_workflow_run():
    """Test workflow execution."""
    workflow = TestWorkflow(name="TestWorkflow")
    agent1 = TestAgent(name="Agent1")
    agent2 = TestAgent(name="Agent2")
    workflow.add_agent(agent1)
    workflow.add_agent(agent2)

    results = await workflow.run("test input")
    assert len(results) == 2
    assert results[0] == "Executed: test input"
    assert results[1] == "Executed: test input"


def test_workflow_repr():
    """Test workflow string representation."""
    workflow = TestWorkflow(name="TestWorkflow")
    assert repr(workflow) == "TestWorkflow(name=TestWorkflow, agents=0)"
