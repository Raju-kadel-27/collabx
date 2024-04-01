import { IoChevronDown } from "react-icons/io5";
import { IoRocket } from "react-icons/io5";
import { PopOver } from "./PopOver";
import { useGetAllTeamsByUserIdQuery } from "../redux/apis/teamApiSlice";
import { BiLoader } from "react-icons/bi";
import { Link } from "react-router-dom";

const RenderTeamsAndChannels = () => {

    const { data,
        isUninitialized,
        isLoading,
        isFetching
    } = useGetAllTeamsByUserIdQuery('teamList', {
        pollingInterval: 0,
        refetchOnFocus: false
    });

    console.log('teamwithchannels', { data });

    if (
        isLoading
        || isUninitialized
        || isFetching
        || !data?.length
    ) {
        return (
            <BiLoader size={24} />
        )
    }

    return (
        <>
            {data[0]?.teams
                ?.map((
                    { _id: teamId, name: teamName, channels }
                        :
                        { _id: string, name: string; channels: any }
                ) => (
                    <section className='px-1 mt-4'>
                        <div className='flex relative justify-between items-center'>
                            <div className='flex w-full justify-start space-x-2 items-center'>
                                <IoChevronDown size={18} color='white' />
                                <div className="flex space-x-2 items-center">
                                    {/* <IoRocket size={10} color='white' /> */}
                                    <p className='text-slate-200 font-lato text-sm my-1'>
                                        {teamName &&
                                            teamName?.length > 10 ?
                                            `${teamName.slice(0, 40)}`
                                            :
                                            teamName
                                        }
                                        {/* {teamName} */}
                                    </p>
                                </div>
                            </div>
                            <PopOver />
                        </div>

                        <div className='px-3 text-slate-400 text-sm space-y-1 my-2 '>
                            {channels &&
                                channels
                                    .map(({ _id: channelId, name }:
                                        {
                                            _id: string;
                                            channelId: string;
                                            name: string
                                        }
                                    ) => (
                                        <p className='hover:text-pink-400  font-lato cursor-pointer'>
                                            <Link to={`/teams/${teamId}/channels/${channelId}`}>
                                                <strong className="mr-1"> # </strong>
                                                {name}
                                            </Link>
                                        </p>
                                    ))
                            }
                        </div>

                    </section>
                ))}
        </>
    )
};

export const TeamSidebar = () => {
    return (
        <RenderTeamsAndChannels />
    )
}
