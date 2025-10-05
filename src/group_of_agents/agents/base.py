"""Base agent module for the GroupOfAgents framework."""

from abc import ABC, abstractmethod
from typing import Any, Dict, Optional


class BaseAgent(ABC):
    """Base class for all agents in the framework."""

    def __init__(self, name: str, config: Optional[Dict[str, Any]] = None):
        """
        Initialize a base agent.

        Args:
            name: The name of the agent
            config: Optional configuration dictionary
        """
        self.name = name
        self.config = config or {}

    @abstractmethod
    async def execute(self, task: str, context: Optional[Dict[str, Any]] = None) -> Any:
        """
        Execute a task.

        Args:
            task: The task to execute
            context: Optional context dictionary

        Returns:
            The result of the task execution
        """
        pass

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(name={self.name})"
