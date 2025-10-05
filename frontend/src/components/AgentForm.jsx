import React, { useState, useEffect } from 'react';

function AgentForm({ agent, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    role: '',
    capabilities: '',
    mcpServers: []
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name || '',
        description: agent.description || '',
        role: agent.role || '',
        capabilities: agent.capabilities || '',
        mcpServers: agent.mcpServers || []
      });
    }
  }, [agent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddMcpServer = () => {
    setFormData({
      ...formData,
      mcpServers: [...formData.mcpServers, { name: '', endpoint: '', description: '' }]
    });
  };

  const handleRemoveMcpServer = (index) => {
    const newServers = formData.mcpServers.filter((_, i) => i !== index);
    setFormData({ ...formData, mcpServers: newServers });
  };

  const handleMcpServerChange = (index, field, value) => {
    const newServers = [...formData.mcpServers];
    newServers[index][field] = value;
    setFormData({ ...formData, mcpServers: newServers });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{agent ? 'Edit Agent' : 'Create New Agent'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Agent Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Data Analyzer, Content Writer"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of what this agent does"
            />
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., analyst, coordinator, executor"
            />
          </div>
          
          <div className="form-group">
            <label>Capabilities</label>
            <textarea
              value={formData.capabilities}
              onChange={(e) => setFormData({ ...formData, capabilities: e.target.value })}
              placeholder="Describe the agent's capabilities and skills"
            />
          </div>
          
          <div className="form-group">
            <label>MCP Servers</label>
            <div className="mcp-server-list">
              {formData.mcpServers.map((server, index) => (
                <div key={index} style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      value={server.name}
                      onChange={(e) => handleMcpServerChange(index, 'name', e.target.value)}
                      placeholder="Server Name"
                      style={{ marginBottom: '0.5rem' }}
                    />
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      value={server.endpoint}
                      onChange={(e) => handleMcpServerChange(index, 'endpoint', e.target.value)}
                      placeholder="Endpoint URL or command"
                    />
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <input
                      type="text"
                      value={server.description}
                      onChange={(e) => handleMcpServerChange(index, 'description', e.target.value)}
                      placeholder="Description (optional)"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveMcpServer(index)}
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddMcpServer}
              >
                + Add MCP Server
              </button>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {agent ? 'Update' : 'Create'} Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgentForm;
