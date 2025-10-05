import React, { useState, useEffect } from 'react';

function WorkflowForm({ workflow, agents, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    workflowDescription: '',
    steps: []
  });

  useEffect(() => {
    if (workflow) {
      setFormData({
        name: workflow.name || '',
        description: workflow.description || '',
        workflowDescription: workflow.workflowDescription || '',
        steps: workflow.steps || []
      });
    }
  }, [workflow]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          id: Date.now().toString(),
          agentId: '',
          action: '',
          order: formData.steps.length + 1,
          dependencies: []
        }
      ]
    });
  };

  const handleRemoveStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    // Reorder remaining steps
    newSteps.forEach((step, i) => {
      step.order = i + 1;
    });
    setFormData({ ...formData, steps: newSteps });
  };

  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const handleDependencyChange = (index, dependencies) => {
    const newSteps = [...formData.steps];
    newSteps[index].dependencies = dependencies;
    setFormData({ ...formData, steps: newSteps });
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{workflow ? 'Edit Workflow' : 'Create New Workflow'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Workflow Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="e.g., Content Creation Pipeline"
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this workflow"
            />
          </div>
          
          <div className="form-group">
            <label>Workflow Description</label>
            <textarea
              value={formData.workflowDescription}
              onChange={(e) => setFormData({ ...formData, workflowDescription: e.target.value })}
              placeholder="Describe how agents should cooperate and the flow of work"
              style={{ minHeight: '120px' }}
            />
          </div>
          
          <div className="form-group">
            <label>Workflow Steps</label>
            <div style={{ marginBottom: '1rem' }}>
              {formData.steps.map((step, index) => (
                <div key={step.id} style={{ 
                  padding: '1rem', 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '4px',
                  marginBottom: '0.5rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <strong>Step {step.order}</strong>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveStep(index)}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      Remove
                    </button>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      Agent
                    </label>
                    <select
                      value={step.agentId}
                      onChange={(e) => handleStepChange(index, 'agentId', e.target.value)}
                      style={{ width: '100%' }}
                    >
                      <option value="">Select an agent</option>
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      Action
                    </label>
                    <input
                      type="text"
                      value={step.action}
                      onChange={(e) => handleStepChange(index, 'action', e.target.value)}
                      placeholder="What should this agent do?"
                      style={{ width: '100%' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ fontSize: '0.875rem', marginBottom: '0.25rem', display: 'block' }}>
                      Dependencies (comma-separated step numbers)
                    </label>
                    <input
                      type="text"
                      value={step.dependencies.join(', ')}
                      onChange={(e) => {
                        const deps = e.target.value
                          .split(',')
                          .map(d => d.trim())
                          .filter(d => d && !isNaN(d))
                          .map(d => parseInt(d));
                        handleDependencyChange(index, deps);
                      }}
                      placeholder="e.g., 1, 2"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleAddStep}
              >
                + Add Step
              </button>
            </div>
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {workflow ? 'Update' : 'Create'} Workflow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorkflowForm;
