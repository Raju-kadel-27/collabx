import { ModalProvider } from "@/components/ui/modal";
import { CreateTask } from "./CreateTask";
import { UpdateTask } from "./UpdateTask";

enum Priority {
    HIGH = 'high',
    MEDIUM = 'medium',
    LOW = 'low'
}

const BgColorProvider = (type: string) => {
    switch (type) {
        case Priority.HIGH:
            return '#fee2e2';
        case Priority.MEDIUM:
            return '#fef9c3';
        case Priority.LOW:
            return '#dbeafe'
    }
}

enum ModalType {

    CREATE = 'create',
    UPDATE = 'update'
}

const ModalBody = ({ modalType }: { modalType: string }) => {

    switch (modalType) {
        case ModalType.CREATE:
            return <CreateTask />
        case ModalType.UPDATE:
            return <UpdateTask />
        default:
            return null
    }
}

export const ModalContainer = ({ open, setOpen }: any) => {

    return (
        <ModalProvider
            title="Create Task for People"
            open={open}
            setOpen={setOpen}>

            <ModalBody
                modalType={'create'}
            />

        </ModalProvider>
    )
}