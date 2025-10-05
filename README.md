# GroupOfAgents

A web application for managing multi-agent systems with MCP (Model Context Protocol) server integration and visual workflow orchestration.

## Features

- **Agent Management**: Create and configure AI agents with specific roles and capabilities
- **MCP Server Integration**: Connect agents to various MCP servers for enhanced functionality
- **Workflow Designer**: Define workflows with visual representation of agent cooperation
- **Visual Flow Diagram**: Interactive visualization of agent workflows using ReactFlow
- **Agent Orchestration**: Define dependencies and execution order for complex multi-agent tasks

## Architecture

The application consists of:
- **Backend**: Express.js REST API server (port 3001)
- **Frontend**: React application with Vite build system
- **Data Storage**: File-based JSON storage for agents and workflows
- **Visualization**: ReactFlow for interactive workflow diagrams

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/amchen82/GroupOfAgents.git
cd GroupOfAgents
```

2. Install dependencies:
```bash
npm install
cd frontend && npm install
cd ..
```

## Usage

### Development Mode

Run the backend and frontend separately for development:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```
The backend API will start on http://localhost:3001

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```
The frontend dev server will start on http://localhost:5173

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

The application will be available at http://localhost:3001

## Application Guide

### Creating Agents

1. Navigate to the "Agents" tab
2. Click "New Agent" button
3. Fill in agent details:
   - **Name**: Unique identifier for the agent
   - **Description**: Brief description of the agent's purpose
   - **Role**: The agent's role in workflows (e.g., analyst, coordinator, executor)
   - **Capabilities**: Description of what the agent can do
   - **MCP Servers**: Configure access to MCP servers
     - Add server name, endpoint, and description
     - Agents can have multiple MCP server connections

### Managing MCP Servers

For each agent, you can configure access to various MCP servers:
- **Server Name**: Identifier for the MCP server
- **Endpoint**: URL or command to access the server
- **Description**: What functionality this server provides

### Creating Workflows

1. Navigate to the "Workflows" tab
2. Click "New Workflow" button
3. Configure the workflow:
   - **Name**: Workflow identifier
   - **Description**: Brief description
   - **Workflow Description**: Detailed description of agent cooperation and flow
   - **Steps**: Define the sequence of agent actions
     - Select the agent for each step
     - Define the action to be performed
     - Set dependencies (which steps must complete first)

### Visualizing Workflows

- Click on any workflow card to view its visual representation
- The flow diagram shows:
  - Each step as a node with agent name and action
  - Dependencies as connecting arrows
  - Step order and execution flow

### Workflow Execution Flow

The visual diagram represents:
- **Nodes**: Individual workflow steps with assigned agents
- **Edges**: Dependencies between steps (animated arrows)
- **Order**: Sequential numbering of steps
- **Parallel Execution**: Steps without dependencies can run in parallel

## API Endpoints

### Agents
- `GET /api/agents` - List all agents
- `GET /api/agents/:id` - Get specific agent
- `POST /api/agents` - Create new agent
- `PUT /api/agents/:id` - Update agent
- `DELETE /api/agents/:id` - Delete agent

### Workflows
- `GET /api/workflows` - List all workflows
- `GET /api/workflows/:id` - Get specific workflow
- `POST /api/workflows` - Create new workflow
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow

## Data Structure

### Agent
```json
{
  "id": "uuid",
  "name": "Agent Name",
  "description": "Agent description",
  "role": "analyst",
  "capabilities": "Data analysis, visualization",
  "mcpServers": [
    {
      "name": "Server Name",
      "endpoint": "http://example.com/api",
      "description": "Server description"
    }
  ],
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### Workflow
```json
{
  "id": "uuid",
  "name": "Workflow Name",
  "description": "Workflow description",
  "workflowDescription": "Detailed cooperation description",
  "steps": [
    {
      "id": "step-id",
      "agentId": "agent-uuid",
      "action": "Action to perform",
      "order": 1,
      "dependencies": [previous-step-order]
    }
  ],
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

## Technology Stack

- **Backend**: Express.js, Node.js
- **Frontend**: React 19, Vite
- **Visualization**: ReactFlow
- **Storage**: File-based JSON
- **Styling**: Custom CSS

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
