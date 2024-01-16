import { useState } from "react";
import { ModalContainer } from "./ModalContainer"
import { Table } from "./Table"

enum ModalType {
    CREATE = 'create',
    UPDATE = 'update'
}

interface Modal {
    isOpen: boolean,
    type: ModalType.CREATE | ModalType.UPDATE | null
}

export const TaskTab = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Table setOpen={setOpen} />

            <ModalContainer
                open={open}
                setOpen={setOpen}
            />

        </>
    )
}
