"""
Simple example of creating and running agents with GroupOfAgents.
"""

import asyncio

from group_of_agents.agents.base import BaseAgent
from group_of_agents.workflows.base import BaseWorkflow


class SimpleAgent(BaseAgent):
    """A simple agent that processes tasks."""

    async def execute(self, task: str, context=None):
        """Execute a task and return a result."""
        print(f"[{self.name}] Processing task: {task}")
        await asyncio.sleep(0.5)  # Simulate some work
        return f"[{self.name}] Completed: {task}"


class SequentialWorkflow(BaseWorkflow):
    """A workflow that runs agents sequentially."""

    async def run(self, input_data, context=None):
        """Run all agents in sequence."""
        print(f"\nStarting workflow: {self.name}")
        print(f"Input: {input_data}\n")

        results = []
        for agent in self.agents:
            result = await agent.execute(input_data, context)
            results.append(result)
            print(result)

        print(f"\nWorkflow {self.name} completed!")
        return results


async def main():
    """Main function to run the example."""
    # Create agents
    agent1 = SimpleAgent(name="Agent-1", config={"role": "analyzer"})
    agent2 = SimpleAgent(name="Agent-2", config={"role": "processor"})
    agent3 = SimpleAgent(name="Agent-3", config={"role": "validator"})

    # Create workflow and add agents
    workflow = SequentialWorkflow(name="SimpleWorkflow")
    workflow.add_agent(agent1)
    workflow.add_agent(agent2)
    workflow.add_agent(agent3)

    # Run the workflow
    results = await workflow.run("Process this data")

    print(f"\nFinal results: {len(results)} tasks completed")


if __name__ == "__main__":
    asyncio.run(main())
