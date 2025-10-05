const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, '../data');
const AGENTS_FILE = path.join(DATA_DIR, 'agents.json');
const WORKFLOWS_FILE = path.join(DATA_DIR, 'workflows.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Initialize data files
async function initializeDataFiles() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    
    try {
      await fs.access(AGENTS_FILE);
    } catch {
      await fs.writeFile(AGENTS_FILE, JSON.stringify([], null, 2));
    }
    
    try {
      await fs.access(WORKFLOWS_FILE);
    } catch {
      await fs.writeFile(WORKFLOWS_FILE, JSON.stringify([], null, 2));
    }
  } catch (error) {
    console.error('Error initializing data files:', error);
  }
}

// Helper functions
async function readAgents() {
  const data = await fs.readFile(AGENTS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeAgents(agents) {
  await fs.writeFile(AGENTS_FILE, JSON.stringify(agents, null, 2));
}

async function readWorkflows() {
  const data = await fs.readFile(WORKFLOWS_FILE, 'utf8');
  return JSON.parse(data);
}

async function writeWorkflows(workflows) {
  await fs.writeFile(WORKFLOWS_FILE, JSON.stringify(workflows, null, 2));
}

// Agent endpoints
app.get('/api/agents', async (req, res) => {
  try {
    const agents = await readAgents();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/agents/:id', async (req, res) => {
  try {
    const agents = await readAgents();
    const agent = agents.find(a => a.id === req.params.id);
    if (agent) {
      res.json(agent);
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/agents', async (req, res) => {
  try {
    const agents = await readAgents();
    const newAgent = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    agents.push(newAgent);
    await writeAgents(agents);
    res.status(201).json(newAgent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/agents/:id', async (req, res) => {
  try {
    const agents = await readAgents();
    const index = agents.findIndex(a => a.id === req.params.id);
    if (index !== -1) {
      agents[index] = {
        ...agents[index],
        ...req.body,
        id: req.params.id,
        updatedAt: new Date().toISOString()
      };
      await writeAgents(agents);
      res.json(agents[index]);
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/agents/:id', async (req, res) => {
  try {
    const agents = await readAgents();
    const filteredAgents = agents.filter(a => a.id !== req.params.id);
    if (filteredAgents.length < agents.length) {
      await writeAgents(filteredAgents);
      res.json({ message: 'Agent deleted successfully' });
    } else {
      res.status(404).json({ error: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Workflow endpoints
app.get('/api/workflows', async (req, res) => {
  try {
    const workflows = await readWorkflows();
    res.json(workflows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/workflows/:id', async (req, res) => {
  try {
    const workflows = await readWorkflows();
    const workflow = workflows.find(w => w.id === req.params.id);
    if (workflow) {
      res.json(workflow);
    } else {
      res.status(404).json({ error: 'Workflow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/workflows', async (req, res) => {
  try {
    const workflows = await readWorkflows();
    const newWorkflow = {
      id: uuidv4(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    workflows.push(newWorkflow);
    await writeWorkflows(workflows);
    res.status(201).json(newWorkflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/workflows/:id', async (req, res) => {
  try {
    const workflows = await readWorkflows();
    const index = workflows.findIndex(w => w.id === req.params.id);
    if (index !== -1) {
      workflows[index] = {
        ...workflows[index],
        ...req.body,
        id: req.params.id,
        updatedAt: new Date().toISOString()
      };
      await writeWorkflows(workflows);
      res.json(workflows[index]);
    } else {
      res.status(404).json({ error: 'Workflow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/workflows/:id', async (req, res) => {
  try {
    const workflows = await readWorkflows();
    const filteredWorkflows = workflows.filter(w => w.id !== req.params.id);
    if (filteredWorkflows.length < workflows.length) {
      await writeWorkflows(filteredWorkflows);
      res.json({ message: 'Workflow deleted successfully' });
    } else {
      res.status(404).json({ error: 'Workflow not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// Start server
initializeDataFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
