import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

export const EmojiMart = ({handleEmoji}:any) => {

    return (
        <Picker data={data} onEmojiSelect={handleEmoji} />
    )
}

