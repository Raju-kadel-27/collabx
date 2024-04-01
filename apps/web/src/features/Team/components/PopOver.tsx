import { PopoverProvider } from '@/components/ui/popover';
import { IoEllipsisVertical } from 'react-icons/io5';
import { Options, OptionList } from "./ChannelOptionList";
import React from 'react';

export const PopOver = () => {
    return (
        <PopoverProvider
            triggerer={<IoEllipsisVertical size={18} />}
        >
            <div className='flex flex-col items-start justify-start'>
                {Options.map(({ optionName, icon }, i) => (
                    <React.Fragment key={i}>
                        <OptionList optionName={optionName} icon={icon} />
                    </React.Fragment>
                ))}
            </div>
        </PopoverProvider>
    )
}