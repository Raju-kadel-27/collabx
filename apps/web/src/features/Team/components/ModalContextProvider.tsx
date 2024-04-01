import
React,
{
    createContext,
    useContext,
    ReactNode,
    useState
} from 'react';

interface ModalContextData {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalType: string;
    setModalType: React.Dispatch<React.SetStateAction<string>>;
}

const ModalContext = createContext<ModalContextData | undefined>(undefined);

const useModalContext = (): ModalContextData => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalContextProvider');
    }
    return context;
};

interface ModalContextProviderProps {
    children: ReactNode;
}

const ModalContextProvider:
    React.FC<ModalContextProviderProps> =
    ({ children }) => {

        const [open, setOpen] = useState<boolean>(false);
        const [modalType, setModalType] = useState<string>('')

        const contextValue: ModalContextData = {
            open,
            setOpen,
            modalType,
            setModalType
        };

        return (
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
        );
    };

export {
    ModalContextProvider,
    useModalContext
};
