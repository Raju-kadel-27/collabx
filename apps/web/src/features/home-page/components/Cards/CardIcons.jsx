import { CardIconType } from './CardIconType';
import { BsChatLeftText } from 'react-icons/bs';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineLaptop, AiOutlineSetting } from 'react-icons/ai';
import { BiPodcast } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';

export const CardIcons = ({ type, ...props }) => {

    switch (type) {
        case CardIconType.CHAT:
            return <BsChatLeftText color={props.iconColor} size={props.iconSize} {...props} />
        case CardIconType.CLASSROOM:
            return <GrGroup color={props.iconColor} size={props.iconSize} {...props} />
        case CardIconType.PODCAST:
            return <BiPodcast color={props.iconColor} size={props.iconSize} {...props} />
        case CardIconType.STREAM_SETTING:
            return <AiOutlineSetting color={props.iconColor} size={props.iconSize} {...props} />
        case CardIconType.DOCS:
            return <BsPencilSquare color={props.iconColor} size={props.iconSize} {...props} />
        case CardIconType.INTERVIEW:
            return <AiOutlineLaptop color={props.iconColor} size={props.iconSize} {...props} />

        default:
            return;
    }
}

