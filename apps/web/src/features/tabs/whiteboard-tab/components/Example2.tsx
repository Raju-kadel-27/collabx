import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Panel,
    Controls,
    MiniMap,
    EdgeText,
    ControlButton,
    Background
} from 'reactflow';
import 'reactflow/dist/style.css';

import './example2.css';
import { BiChevronDownCircle } from 'react-icons/bi';

const initialNodes = [
    {
        id: '0',
        type: 'input',
        data: { label: 'Node' },
        position: { x: 0, y: 50 },
    },
];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {
    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const onConnect = useCallback(
        (params: any) => {
            // reset the start node on connections
            connectingNodeId.current = null;
            setEdges((eds) => addEdge(params, eds))
        },
        [],
    );

    const onConnectStart = useCallback((_, { nodeId }: any) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback(
        (event: any) => {
            if (!connectingNodeId.current) return;

            const targetIsPane = event.target.classList.contains('react-flow__pane');

            if (targetIsPane) {
                // we need to remove the wrapper bounds, in order to get the correct position
                const id = getId();
                const newNode = {
                    id,
                    position: screenToFlowPosition({
                        x: event.clientX,
                        y: event.clientY,
                    }),
                    data: { label: `Node ${id}` },
                    origin: [0.5, 0.0],
                };

                setNodes((nds) => nds.concat(newNode));
                setEdges((eds) =>
                    eds.concat({ id, source: connectingNodeId.current, target: id }),
                );
            }
        },
        [screenToFlowPosition],
    );

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
        <div
            style={{ height: '80vh', width: '100vw' }}
            className="wrapper"
            ref={reactFlowWrapper}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
            >

                <Panel position='top-left'>
                    <button className='bg-gray-200 text-xs p-1 font-lato mx-1' onClick={() => zoomIn({ duration: 800 })}>Zoom in</button>
                    <button className='bg-gray-200 text-xs p-1 font-lato mx-1' onClick={() => zoomOut({ duration: 800 })}>Zoom out</button>
                    <button className='bg-gray-200 text-xs p-1 font-lato mx-1' onClick={handleTransform}>Center</button>
                    <button className='bg-gray-200 text-xs p-1 font-lato mx-1' onClick={onAdd}>Add Node</button>
                </Panel>

                <EdgeText
                    x={100}
                    y={100}
                    labelStyle={{ fill: 'white' }}
                    labelShowBg
                    labelBgStyle={{ fill: 'red' }}
                    labelBgPadding={[2, 4]}
                    labelBgBorderRadius={2}
                />
                <Controls />
                <MiniMap />
                <Controls>
                    <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
                        <BiChevronDownCircle size={24} />
                    </ControlButton>
                </Controls>
                <Background color="#ccc" variant="dots" />
            </ReactFlow>

        </div>
    );
};

export const Example2 = () => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
);
