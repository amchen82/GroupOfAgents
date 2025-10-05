"""Utility functions for the GroupOfAgents framework."""

from typing import Any, Dict


def merge_configs(*configs: Dict[str, Any]) -> Dict[str, Any]:
    """
    Merge multiple configuration dictionaries.

    Args:
        *configs: Variable number of configuration dictionaries

    Returns:
        A merged configuration dictionary
    """
    merged = {}
    for config in configs:
        merged.update(config)
    return merged


def validate_config(config: Dict[str, Any], required_keys: list) -> bool:
    """
    Validate that a configuration has all required keys.

    Args:
        config: The configuration dictionary to validate
        required_keys: List of required keys

    Returns:
        True if all required keys are present, False otherwise
    """
    return all(key in config for key in required_keys)
