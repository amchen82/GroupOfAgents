"""Tests for utility functions."""

from group_of_agents.utils import merge_configs, validate_config


def test_merge_configs():
    """Test merging multiple configurations."""
    config1 = {"key1": "value1", "key2": "value2"}
    config2 = {"key2": "override", "key3": "value3"}
    config3 = {"key4": "value4"}

    merged = merge_configs(config1, config2, config3)

    assert merged["key1"] == "value1"
    assert merged["key2"] == "override"
    assert merged["key3"] == "value3"
    assert merged["key4"] == "value4"


def test_validate_config_valid():
    """Test validating a valid configuration."""
    config = {"key1": "value1", "key2": "value2", "key3": "value3"}
    required_keys = ["key1", "key2"]

    assert validate_config(config, required_keys) is True


def test_validate_config_invalid():
    """Test validating an invalid configuration."""
    config = {"key1": "value1"}
    required_keys = ["key1", "key2", "key3"]

    assert validate_config(config, required_keys) is False


def test_validate_config_empty():
    """Test validating with empty required keys."""
    config = {"key1": "value1"}
    required_keys = []

    assert validate_config(config, required_keys) is True
