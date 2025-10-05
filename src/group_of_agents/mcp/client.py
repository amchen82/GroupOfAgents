"""MCP (Model Context Protocol) module for the GroupOfAgents framework."""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional


class MCPClient(ABC):
    """Base class for MCP clients."""

    def __init__(self, endpoint: str, config: Optional[Dict[str, Any]] = None):
        """
        Initialize an MCP client.

        Args:
            endpoint: The MCP endpoint URL
            config: Optional configuration dictionary
        """
        self.endpoint = endpoint
        self.config = config or {}

    @abstractmethod
    async def send_message(self, message: Dict[str, Any]) -> Dict[str, Any]:
        """
        Send a message to the MCP server.

        Args:
            message: The message to send

        Returns:
            The response from the server
        """
        pass

    @abstractmethod
    async def list_tools(self) -> List[Dict[str, Any]]:
        """
        List available tools from the MCP server.

        Returns:
            A list of tool definitions
        """
        pass

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(endpoint={self.endpoint})"
