"""Base workflow module for the GroupOfAgents framework."""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional

from group_of_agents.agents.base import BaseAgent


class BaseWorkflow(ABC):
    """Base class for all workflows in the framework."""

    def __init__(self, name: str, agents: Optional[List[BaseAgent]] = None):
        """
        Initialize a base workflow.

        Args:
            name: The name of the workflow
            agents: Optional list of agents in the workflow
        """
        self.name = name
        self.agents = agents or []

    def add_agent(self, agent: BaseAgent) -> None:
        """
        Add an agent to the workflow.

        Args:
            agent: The agent to add
        """
        self.agents.append(agent)

    @abstractmethod
    async def run(self, input_data: Any, context: Optional[Dict[str, Any]] = None) -> Any:
        """
        Run the workflow.

        Args:
            input_data: Input data for the workflow
            context: Optional context dictionary

        Returns:
            The result of the workflow execution
        """
        pass

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(name={self.name}, agents={len(self.agents)})"
