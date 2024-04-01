import { AvatarWithUser } from "@/features/Team/components/AvatarWithUser";
import { SearchMemberInput } from "@/features/Team/components/SearchMember";
import { useFetchAllUsersQuery } from "@/features/text-chat/redux/apis/chatApiSlice";
import { Divider } from "@chakra-ui/react";
let channelId = ''

const Members = () => {
    const {
        data,
        isLoading,
        isFetching,
        isSuccess
    } = useFetchAllUsersQuery(channelId)

    console.log({ data })
    console.log({
        isLoading,
        isFetching,
        isSuccess
    })

    return (
        <>
            <SearchMemberInput />
            <div className='h-[50vh] overflow-y-auto'>
                {
                    data?.allUsers
                        ?.map((user: any) => (
                            <>
                                <AvatarWithUser type='member' name={user.name} avatar='' />
                                <Divider />
                            </>
                        ))
                }
            </div>
        </>
    )
};