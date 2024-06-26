import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
} from 'reactflow';

import { nodes as initialNodes, edges as initialEdges } from './Initial-elements';
import CustomNode from './Custom-Node';

import 'reactflow/dist/style.css';
import './style.css';

const nodeTypes = {
    custom: CustomNode,
};

const minimapStyle = {
    height: 120,
};

const onInit = (reactFlowInstance: any) => console.log('flow loaded:', reactFlowInstance);

export const ReactFlowContainer = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

    // we are using a bit of a shortcut here to adjust the edge type
    // this could also be done with a custom edge for example
    const edgesWithUpdatedTypes = edges.map((edge) => {
        if (edge.sourceHandle) {
            const edgeType = nodes.find((node: any) => node.type === 'custom').data.selects[edge.sourceHandle];
            edge.type = edgeType;
        }

        return edge;
    });

    return (
        <div className='h-[100vh] w-[100vw]'>
            <ReactFlow
                nodes={nodes}
                edges={edgesWithUpdatedTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={onInit}
                fitView
                attributionPosition="top-right"
                nodeTypes={nodeTypes}
            >
                <MiniMap style={minimapStyle} zoomable pannable />
                <Controls />
                <Background color="#aaa" gap={16} />
            </ReactFlow>
        </div>
    );
};

