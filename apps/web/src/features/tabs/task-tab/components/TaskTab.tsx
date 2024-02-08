import { useRef, useState } from "react";
import { ModalContainer } from "./ModalContainer"
import { Table } from "./Table"

enum ModalType {
    CREATE = 'create',
    UPDATE = 'update'
}

export default function TaskTab() {

    const taskRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [modalType, setModalType] = useState<
        ModalType.CREATE |
        ModalType.UPDATE |
        ''
    >('');

    return (
        <>
            <Table
                setModalType={setModalType}
                setOpen={setOpen}
                ref={taskRef}
            />

            <ModalContainer
                modalType={modalType}
                open={open}
                setOpen={setOpen}
                ref={taskRef}
            />

        </>
    )
}
