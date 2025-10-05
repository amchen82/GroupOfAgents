"""Test configuration file."""

import pytest


@pytest.fixture
def sample_config():
    """Sample configuration for tests."""
    return {
        "api_key": "test_key",
        "endpoint": "http://localhost:8000",
        "timeout": 30,
    }


@pytest.fixture
def sample_agent_name():
    """Sample agent name for tests."""
    return "TestAgent"
