import React, { useEffect, useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';

function WorkflowCanvas({ workflow, agents }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!workflow || !workflow.steps) return;

    // Create nodes from workflow steps
    const newNodes = workflow.steps.map((step, index) => {
      const agent = agents.find(a => a.id === step.agentId);
      const agentName = agent ? agent.name : 'Unknown Agent';
      
      // Position nodes in a grid or flow pattern
      const x = (index % 3) * 300 + 100;
      const y = Math.floor(index / 3) * 150 + 50;
      
      return {
        id: step.id,
        type: 'default',
        position: { x, y },
        data: {
          label: (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                Step {step.order}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                {agentName}
              </div>
              <div style={{ fontSize: '11px', marginTop: '4px', color: '#888' }}>
                {step.action}
              </div>
            </div>
          ),
        },
        style: {
          background: '#fff',
          border: '2px solid #3498db',
          borderRadius: '8px',
          padding: '10px',
          width: 200,
        },
      };
    });

    // Create edges from dependencies
    const newEdges = [];
    workflow.steps.forEach((step) => {
      if (step.dependencies && step.dependencies.length > 0) {
        step.dependencies.forEach(depOrder => {
          const sourceStep = workflow.steps.find(s => s.order === depOrder);
          if (sourceStep) {
            newEdges.push({
              id: `${sourceStep.id}-${step.id}`,
              source: sourceStep.id,
              target: step.id,
              type: 'smoothstep',
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 20,
                height: 20,
                color: '#3498db',
              },
              style: {
                strokeWidth: 2,
                stroke: '#3498db',
              },
            });
          }
        });
      }
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [workflow, agents, setNodes, setEdges]);

  if (!workflow || !workflow.steps || workflow.steps.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#7f8c8d'
      }}>
        No workflow steps to visualize
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      attributionPosition="bottom-left"
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  );
}

export default WorkflowCanvas;
