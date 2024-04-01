import React, {
    createContext,
    useContext,
    ReactNode,
    useState
} from 'react';

interface CreateTeamContextData {
    teamName: string | '';
    setTeamName: React.Dispatch<React.SetStateAction<string | ''>>;
    channels: string[] | [];
    setChannels: React.Dispatch<React.SetStateAction<string[] | []>>;
    owners: string[] | [];
    setOwners: React.Dispatch<React.SetStateAction<string[] | []>>;
    members: string[] | [];
    setMembers: React.Dispatch<React.SetStateAction<string[] | []>>
}

const CreateTeamContext = createContext<CreateTeamContextData | undefined>(undefined);

interface CreateTeamContextProviderProps {
    children: ReactNode;
}

export const CreateTeamContextProvider:
    React.FC<CreateTeamContextProviderProps> =
    ({ children }) => {

        const [teamName, setTeamName] = useState<string | ''>('');
        const [channels, setChannels] = useState<string[] | []>([]);
        const [owners, setOwners] = useState<string[] | []>([]);
        const [members, setMembers] = useState<string[] | []>([])

        const contextValue: CreateTeamContextData = {
            teamName,
            setTeamName,
            channels,
            setChannels,
            owners,
            setOwners,
            members,
            setMembers
        };

        return (
            <CreateTeamContext.Provider value={contextValue}>
                {children}
            </CreateTeamContext.Provider>
        );
    };
    
export const useCreateTeamContext = (): CreateTeamContextData => {
    const context = useContext(CreateTeamContext);
    console.log({ context });
    if (!context) {
        throw new Error('No createTeam context is present.');
    }
    return context;
};



