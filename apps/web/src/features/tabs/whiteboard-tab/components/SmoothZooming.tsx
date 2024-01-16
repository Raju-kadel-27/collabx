import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    useNodesState,
    useEdgesState,
    Background,
    ReactFlowProvider,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'Smooth Transition' },
        position: { x: 250, y: 5 },
    },
    {
        id: '2',
        type: 'output',
        data: { label: 'zoom-in' },
        position: { x: 100, y: 100 },
    },
    { id: '3', data: { label: 'zoom-out' }, position: { x: 400, y: 100 } },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
];

const ZoomTransition = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);


    const handleTransform = useCallback(() => {
        setViewport({ x: 0, y: 0, zoom: 1 }, { duration: 800 });
    }, [setViewport]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
           
            <Background />
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <ZoomTransition />
    </ReactFlowProvider>
);
