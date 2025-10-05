import React, { useState, useEffect } from 'react';
import WorkflowForm from './WorkflowForm';
import WorkflowCanvas from './WorkflowCanvas';

function WorkflowManager() {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState(null);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchWorkflows();
    fetchAgents();
  }, []);

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/workflows');
      const data = await response.json();
      setWorkflows(data);
    } catch (error) {
      console.error('Error fetching workflows:', error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleCreateWorkflow = () => {
    setEditingWorkflow(null);
    setShowForm(true);
  };

  const handleEditWorkflow = (workflow) => {
    setEditingWorkflow(workflow);
    setShowForm(true);
  };

  const handleDeleteWorkflow = async (workflowId) => {
    if (!window.confirm('Are you sure you want to delete this workflow?')) {
      return;
    }
    
    try {
      await fetch(`/api/workflows/${workflowId}`, {
        method: 'DELETE',
      });
      fetchWorkflows();
      if (selectedWorkflow?.id === workflowId) {
        setSelectedWorkflow(null);
      }
    } catch (error) {
      console.error('Error deleting workflow:', error);
    }
  };

  const handleSaveWorkflow = async (workflowData) => {
    try {
      if (editingWorkflow) {
        await fetch(`/api/workflows/${editingWorkflow.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workflowData),
        });
      } else {
        await fetch('/api/workflows', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workflowData),
        });
      }
      fetchWorkflows();
      setShowForm(false);
      setEditingWorkflow(null);
    } catch (error) {
      console.error('Error saving workflow:', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Workflows</h2>
        <button className="btn btn-primary" onClick={handleCreateWorkflow}>
          + New Workflow
        </button>
      </div>
      
      {selectedWorkflow ? (
        <div>
          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <button 
                className="btn btn-secondary"
                onClick={() => setSelectedWorkflow(null)}
                style={{ marginRight: '1rem' }}
              >
                ← Back to List
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleEditWorkflow(selectedWorkflow)}
                style={{ marginRight: '0.5rem' }}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleDeleteWorkflow(selectedWorkflow.id)}
              >
                Delete
              </button>
            </div>
          </div>
          
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>{selectedWorkflow.name}</h3>
            <p style={{ color: '#7f8c8d', marginBottom: '1rem' }}>{selectedWorkflow.description}</p>
            
            {selectedWorkflow.workflowDescription && (
              <div style={{ marginTop: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Workflow Description:</h4>
                <p style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
                  {selectedWorkflow.workflowDescription}
                </p>
              </div>
            )}
          </div>
          
          <div style={{ height: '500px', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden' }}>
            <WorkflowCanvas workflow={selectedWorkflow} agents={agents} />
          </div>
        </div>
      ) : (
        <>
          {workflows.length === 0 ? (
            <div className="empty-state">
              <h3>No workflows yet</h3>
              <p>Create your first workflow to orchestrate your agents</p>
            </div>
          ) : (
            <div className="workflow-list">
              {workflows.map(workflow => (
                <div
                  key={workflow.id}
                  className="workflow-card"
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <h3>{workflow.name}</h3>
                  <p>{workflow.description}</p>
                  <div className="workflow-card-footer">
                    <span>{workflow.steps?.length || 0} steps</span>
                    <span>{new Date(workflow.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      
      {showForm && (
        <WorkflowForm
          workflow={editingWorkflow}
          agents={agents}
          onSave={handleSaveWorkflow}
          onCancel={() => {
            setShowForm(false);
            setEditingWorkflow(null);
          }}
        />
      )}
    </div>
  );
}

export default WorkflowManager;
