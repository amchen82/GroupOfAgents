# Contributing to GroupOfAgents

Thank you for your interest in contributing to GroupOfAgents!

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GroupOfAgents.git
   cd GroupOfAgents
   ```
3. Install development dependencies:
   ```bash
   pip install -e ".[dev]"
   ```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Run tests:
   ```bash
   pytest
   ```
4. Format your code:
   ```bash
   black src/ tests/
   ruff check src/ tests/
   ```
5. Commit your changes:
   ```bash
   git commit -m "Description of your changes"
   ```
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Open a Pull Request

## Code Style

- Follow PEP 8 guidelines
- Use type hints where possible
- Write docstrings for public methods
- Keep functions focused and small
- Add tests for new functionality

## Testing

- Write tests for all new features
- Ensure all tests pass before submitting PR
- Aim for high test coverage
- Use pytest fixtures for common test setup

## Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include tests for new functionality
- Update documentation as needed
- Ensure all CI checks pass

## Questions?

Feel free to open an issue for any questions or concerns.
