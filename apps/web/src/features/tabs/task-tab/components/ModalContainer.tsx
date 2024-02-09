import { ModalProvider } from "@/components/ui/modal";
import { CreateTask } from "./CreateTask";
import { UpdateTask } from "./UpdateTask";
import React, { SetStateAction} from "react";

enum Priority {
    HIGH = "High",
    MEDIUM = 'Medium',
    LOW = "Low"
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

type ModalContainerProps = {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    modalType: string;
}

const ModalBody = React.forwardRef(({ modalType }: { modalType: string }, ref) => {
    switch (modalType) {
        case ModalType.CREATE:
            return <CreateTask />
        case ModalType.UPDATE:
            return <UpdateTask ref={ref} />
        default:
            return null
    }
})

export const ModalContainer = React.forwardRef(
    ({ open, setOpen, modalType }: ModalContainerProps,
        ref: any
    ) => {
        return (
            <ModalProvider
                title="Create Task for People"
                open={open}
                setOpen={setOpen}>

                <ModalBody
                    ref={ref}
                    modalType={modalType}
                />

            </ModalProvider>
        )
    })

