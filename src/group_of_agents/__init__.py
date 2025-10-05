"""
GroupOfAgents - Multi-agents with MCP workflow

A framework for building multi-agent systems with Model Context Protocol (MCP) support.
"""

__version__ = "0.1.0"
__author__ = "amchen82"

from group_of_agents.agents.base import BaseAgent
from group_of_agents.workflows.base import BaseWorkflow

__all__ = ["BaseAgent", "BaseWorkflow", "__version__"]
