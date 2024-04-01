import { LuArchive } from "react-icons/lu";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { CardProvider } from "../CardProvider"
import { ListProviderWithIcon } from "@/components/ui/ListProviderWithIcon";
import { Divider } from "@chakra-ui/react";

export const Settings = () => {
    return (
        <>
            <CardProvider size="md" showEdit={true} title="Channel Name" body="#general" />
            <div className="my-6">
                <ListProviderWithIcon
                    icon={<CiLock color='red' size={26} />}
                    title='Change to a private channel'
                    color='red'
                />
                <Divider />
                <ListProviderWithIcon
                    icon={<CiUnlock color='green' size={26} />}
                    title='Change to a public channel'
                    color='green'
                />
                <Divider />
                <ListProviderWithIcon
                    icon={<LuArchive color='black' size={24} />}
                    title='Archive channel for everyone'
                    color='black'
                />
                <Divider />
                <ListProviderWithIcon
                    icon={<RiDeleteBinLine color='red' size={24} />}
                    title='Delete this channel'
                    color='red'
                />
                <Divider />
            </div>
        </>
    )
}
