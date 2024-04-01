import { useDispatch } from "react-redux";
import { openModal } from "../redux/slices/team";
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

export const RenderChannels = () => {
    let showModal = true
    return (
        showModal
    )
}

export const Options =
    [
        {
            optionName: "Create Channel",
            icon: <IoCreateOutline size={24} />
        },
        {
            optionName: "Manage Team",
            icon: <MdOutlineManageAccounts size={24} />
        }
    ]

type OptionListProps = {
    optionName: string,
    icon: any,
    props?: any
}


export const OptionList = ({ optionName, icon, ...props }: OptionListProps) => {

    const dispatch = useDispatch()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log({ e })
        dispatch(openModal({
            isModalOpen: true,
            modalType: optionName
        }))
    }

    return (
        <div className="flex items-center hover:bg-slate-100 hover:cursor-pointer px-3">
            {icon}
            <button
                onClick={handleClick}
                className='p-1 text-md px-2 font-lato transition-all ease-out duration-200 '
                {...props}
            >
                {optionName}
            </button>
        </div>
    )
}