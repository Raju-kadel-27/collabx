import { Breadcrum } from './Breadcrum';
import { CreateChannel } from './modals/CreateChannel';
import { ManageTeam } from './modals/ManageTeam';
import { ModalProvider } from '@components/ui/modal';
import { TabsRow } from './Tabs';
import { useSelector } from 'react-redux';
import { CreateTeamWithProvider } from './modals/CreateTeam';

const ModalSwitcher =
    ({ isModalOpen, modalType }:
        {
            isModalOpen: boolean;
            modalType: string
        }
    ) => {

        if (!isModalOpen) return

        switch (modalType) {
            case 'Create Channel':
                return (<CreateChannel />);

            case 'Manage Team':
                return (<ManageTeam />);

            case 'Create Team':
                return (<CreateTeamWithProvider />);
        }
    }

export default function Team() {

    const { isModalOpen, modalType } = useSelector((state: any) => state.root.team);

    return (
        <>
            <div className='h-full w-full'>
                <section className='px-3 py-2'>
                    <Breadcrum />
                </section>
                <section>
                    <TabsRow />
                </section>
            </div>
            <ModalProvider
                title='Team Management'
                size='xl'
                open={isModalOpen}
            >
                <ModalSwitcher
                    isModalOpen={isModalOpen}
                    modalType={modalType}
                />
            </ModalProvider>
        </>
    )
}