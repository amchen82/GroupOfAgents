import React, { useState, useEffect } from 'react';
import AgentForm from './AgentForm';

function AgentManager() {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleCreateAgent = () => {
    setEditingAgent(null);
    setShowForm(true);
  };

  const handleEditAgent = (agent) => {
    setEditingAgent(agent);
    setShowForm(true);
  };

  const handleDeleteAgent = async (agentId) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) {
      return;
    }
    
    try {
      await fetch(`/api/agents/${agentId}`, {
        method: 'DELETE',
      });
      fetchAgents();
      if (selectedAgent?.id === agentId) {
        setSelectedAgent(null);
      }
    } catch (error) {
      console.error('Error deleting agent:', error);
    }
  };

  const handleSaveAgent = async (agentData) => {
    try {
      if (editingAgent) {
        await fetch(`/api/agents/${editingAgent.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(agentData),
        });
      } else {
        await fetch('/api/agents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(agentData),
        });
      }
      fetchAgents();
      setShowForm(false);
      setEditingAgent(null);
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: '100%' }}>
      <div style={{ flex: '0 0 300px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <button className="btn btn-primary" onClick={handleCreateAgent}>
            + New Agent
          </button>
        </div>
        
        {agents.length === 0 ? (
          <div className="empty-state">
            <p>No agents yet. Create your first agent!</p>
          </div>
        ) : (
          <div className="agent-list">
            {agents.map(agent => (
              <div
                key={agent.id}
                className={`agent-item ${selectedAgent?.id === agent.id ? 'selected' : ''}`}
                onClick={() => setSelectedAgent(agent)}
              >
                <h3>{agent.name}</h3>
                <p>{agent.description}</p>
                <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                  <span className="badge">{agent.mcpServers?.length || 0} MCP Servers</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div style={{ flex: 1 }}>
        {selectedAgent ? (
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ marginBottom: '0.5rem' }}>{selectedAgent.name}</h2>
                <p style={{ color: '#7f8c8d' }}>{selectedAgent.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-secondary"
                  onClick={() => handleEditAgent(selectedAgent)}
                >
                  Edit
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleDeleteAgent(selectedAgent.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <p>{selectedAgent.role || 'No role specified'}</p>
            </div>
            
            <div className="form-group">
              <label>Capabilities</label>
              <p>{selectedAgent.capabilities || 'No capabilities specified'}</p>
            </div>
            
            <div className="form-group">
              <label>MCP Servers</label>
              {selectedAgent.mcpServers && selectedAgent.mcpServers.length > 0 ? (
                <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                  {selectedAgent.mcpServers.map((server, index) => (
                    <li key={index} style={{ marginBottom: '0.5rem' }}>
                      <strong>{server.name}</strong>
                      {server.endpoint && ` - ${server.endpoint}`}
                      {server.description && (
                        <div style={{ fontSize: '0.875rem', color: '#7f8c8d' }}>
                          {server.description}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No MCP servers configured</p>
              )}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <h3>Select an agent</h3>
            <p>Choose an agent from the list to view its details</p>
          </div>
        )}
      </div>
      
      {showForm && (
        <AgentForm
          agent={editingAgent}
          onSave={handleSaveAgent}
          onCancel={() => {
            setShowForm(false);
            setEditingAgent(null);
          }}
        />
      )}
    </div>
  );
}

export default AgentManager;
