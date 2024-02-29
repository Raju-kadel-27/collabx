import { PollCard } from './poll-card';
import CreatePollModal from './create-poll-modal';

const PollFeed = () => {
  return (
    <>
      <div className='w-full flex justify-end px-2'>
        <CreatePollModal />
      </div>
      <div className='w-full mx-auto overflow-y-auto'>
        <PollCard />
        <PollCard />
        <PollCard />
      </div>
    </>

  )
}
export default PollFeed;