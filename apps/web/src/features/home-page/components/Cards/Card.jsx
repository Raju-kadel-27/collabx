import { useNavigate } from "react-router"
import { CardIcons } from "./CardIcons"
import { CardIconType } from "./CardIconType"

const Card = ({ title, description, ...props }) => {
    const navigateTo = useNavigate()

    return (
        <div
            key={title}
            onClick={() => navigateTo(props.route)}
            className={`${props.type === CardIconType.STREAM_SETTING ? 'bg-blue-700 hover:bg-blue-600 ' : 'hover:bg-gray-50' } transition-all min-h-[275px] border-slate-200 border-[0.5px] ease-out duration-300
             min-w-xl hover:cursor-pointer  py-8 px-6 rounde`}>

            <div
                className={`${props.type === CardIconType.STREAM_SETTING ? 'bg-blue-500' : 'bg-blue-50' } w-16 mx-auto h-16 z-50 flex justify-center items-center rounded-full`}>
                <CardIcons type={props.type} {...props} />
            </div>

            <p className={`${props.type === CardIconType.STREAM_SETTING ? 'text-slate-200' : 'text-gray-600' } font-bold my-5 text-center w-full  text-lg`}>{title}</p>

            <div style={{ textAlign: 'center' }} className='w-48  '>
                <p className={`${props.type === CardIconType.STREAM_SETTING ? 'text-slate-200 ' : 'text-slate-600' }  max-w-md  `}>{description}</p>
            </div>

        </div>
    )
}

export default Card
