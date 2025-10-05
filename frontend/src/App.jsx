import React, { useState } from 'react';
import AgentManager from './components/AgentManager';
import WorkflowManager from './components/WorkflowManager';

function App() {
  const [activeTab, setActiveTab] = useState('agents');

  return (
    <div className="app">
      <header className="header">
        <h1>GroupOfAgents</h1>
        <p>Multi-Agent Workflow Manager with MCP Server Integration</p>
      </header>
      
      <div className="container">
        <div className="main-content">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'agents' ? 'active' : ''}`}
              onClick={() => setActiveTab('agents')}
            >
              Agents
            </button>
            <button
              className={`tab ${activeTab === 'workflows' ? 'active' : ''}`}
              onClick={() => setActiveTab('workflows')}
            >
              Workflows
            </button>
          </div>
          
          <div className="content">
            {activeTab === 'agents' && <AgentManager />}
            {activeTab === 'workflows' && <WorkflowManager />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
