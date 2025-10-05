# Quick Start Guide

## Installation

1. Install all dependencies:
```bash
npm install
cd frontend && npm install && cd ..
```

## Running the Application

### Development Mode (Recommended for development)

**Terminal 1 - Start Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev:frontend
```

Then open your browser to `http://localhost:5173`

### Production Mode

1. Build the frontend:
```bash
npm run build
```

2. Start the server:
```bash
npm start
```

Then open your browser to `http://localhost:3001`

## Quick Usage Tutorial

### Creating Your First Agent

1. Click the **Agents** tab (if not already selected)
2. Click **+ New Agent** button
3. Fill in the form:
   - **Name**: "Data Analyst"
   - **Description**: "Analyzes data from various sources"
   - **Role**: "analyst"
   - **Capabilities**: "Data analysis, visualization, reporting"
4. Click **+ Add MCP Server** to add MCP server access:
   - **Server Name**: "Database MCP"
   - **Endpoint**: "npx @modelcontextprotocol/server-postgres"
   - **Description**: "PostgreSQL database access"
5. Click **Create Agent**

### Creating Your First Workflow

1. Click the **Workflows** tab
2. Click **+ New Workflow** button
3. Fill in the workflow information:
   - **Name**: "Data Analysis Pipeline"
   - **Description**: "Automated data processing"
   - **Workflow Description**: Describe how agents should work together
4. Add workflow steps:
   - Click **+ Add Step**
   - Select an agent, define the action, and set dependencies
   - Repeat for each step in your workflow
5. Click **Create Workflow**
6. Click on the workflow card to see the visual diagram

### Viewing Workflow Visualization

- Click on any workflow to see the interactive flow diagram
- Each node shows the step number, agent name, and action
- Arrows show dependencies between steps
- Use the controls to zoom and navigate the diagram

## API Examples

### Create an Agent via API

```bash
curl -X POST http://localhost:3001/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Content Writer",
    "description": "Creates content based on data insights",
    "role": "writer",
    "capabilities": "Content creation, copywriting, documentation",
    "mcpServers": [
      {
        "name": "Filesystem MCP",
        "endpoint": "npx @modelcontextprotocol/server-filesystem",
        "description": "File system access"
      }
    ]
  }'
```

### Create a Workflow via API

```bash
curl -X POST http://localhost:3001/api/workflows \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Content Pipeline",
    "description": "Automated content creation",
    "workflowDescription": "Agent cooperation flow description",
    "steps": [
      {
        "id": "step-1",
        "agentId": "YOUR_AGENT_ID",
        "action": "Analyze data",
        "order": 1,
        "dependencies": []
      }
    ]
  }'
```

## Troubleshooting

### Port Already in Use
If port 3001 is already in use, set a different port:
```bash
PORT=3002 npm start
```

### Frontend Build Issues
Clear the build directory and rebuild:
```bash
rm -rf frontend/build
cd frontend && npm run build
```

### Data Reset
To reset all data, delete the data directory:
```bash
rm -rf data
```

The data files will be recreated automatically on next server start.
