import React, { useCallback } from 'react';
import ReactFlow,
{
    useNodesState,
    useEdgesState,
    useReactFlow,
    addEdge,
    MiniMap,
    Controls,
    Panel,
    ReactFlowProvider
} from 'reactflow';

import 'reactflow/dist/base.css';

// import './tailwind-config.js';
import CustomNode from './CustomNode';

const nodeTypes = {
    custom: CustomNode,
};

const initNodes = [
    {
        id: '1',
        type: 'custom',
        data: { name: 'Jane Doe', job: 'CEO', emoji: '😎' },
        position: { x: 0, y: 50 },
    },
    {
        id: '2',
        type: 'custom',
        data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },

        position: { x: -200, y: 200 },
    },
    {
        id: '3',
        type: 'custom',
        data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
        position: { x: 200, y: 200 },
    },
];

const initEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
    },
];

export const Example4 = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);

    const getNodeId = () => `randomnode_${+new Date()}`;

    const { setViewport, zoomIn, zoomOut } = useReactFlow();

    const onAdd = useCallback(() => {
        const newNode = {
            id: getNodeId(),
            data: { label: 'Added node' },
            position: {
                x: Math.random() * window.innerWidth - 100,
                y: Math.random() * window.innerHeight,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const handleTransform = useCallback(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    }, [setViewport]);

    return (
        <div className='w-[100vw] h-[100vh]'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                className="bg-teal-50"
            >
                <Panel position="top-right">
                    <button onClick={() => zoomIn({ duration: 800 })}>zoom in</button>
                    <button onClick={() => zoomOut({ duration: 800 })}>zoom out</button>
                    <button onClick={onAdd}>add node</button>
                    <button onClick={handleTransform}>pan to center(0,0,1)</button>
                </Panel>

                <MiniMap />
                <Controls />
            </ReactFlow>
        </div>
    );
};

