interface ListProviderWithIconProps {
    icon: any;
    title: string;
    color?: string;
}

const smoothAnimation = 'transition-all ease-out duration-200'

export const ListProviderWithIcon =
    ({ icon, title, color }:
        ListProviderWithIconProps) => {
        return (
            <div className={`${smoothAnimation} hover:bg-slate-100 hover:cursor-pointer px-4 flex py-4 items-center space-x-3`}>
                <div>
                    {icon}
                </div>
                <div>
                    <p
                        style={{ color }}
                        className={`font-lato`}>
                        {title}
                    </p>
                </div>
            </div>
        )
    }
