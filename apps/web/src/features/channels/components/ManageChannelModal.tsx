import { ModalProvider } from "@/components/ui/modal";
import { TabsRow } from "./tabs";
import { useState } from "react";

export const ManageChannelModal = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <ModalProvider
            title={""}
            open={open}
            setOpen={setOpen}
        >
            <TabsRow />
        </ModalProvider>
    )
}
