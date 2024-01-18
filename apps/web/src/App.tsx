import Layout from "./Layout";
// import Cards from '@features/home-page/components/Cards';
// import YoutubeStreaming from '@features/youtube-streaming/pages/YoutubeStreaming';
// import Classroom from '@features/classroom/pages/Classroom';
// import Room from '@features/classroom/pages/Room';
import { Routes, Route } from 'react-router-dom';
// import { RoomMesh } from '@features/video-chat/mesh-topology/pages/RoomMesh';
// import { RoomSfu } from '@/features/video-chat/sfu-topology/pages/RoomSfu';
// import { VideoPlayer } from '@features/embedded/video-player/VideoPlayer';
// import { EditorContainer } from '@features/code-collaboration/pages/InterviewRoom';
// import { DocsEditor } from '@features/docs-editor/pages/DocsEditor';
// import { PublicPage } from '@features/public-pages/pages/PublicPage';
import { Register } from '@features/authentication/pages';
import { Login } from '@features/authentication/pages';
// import { TeamDetails } from '@features/classroom/components/TeamDetails/TeamDetails';
// import { Onboarding } from '@features/home-page/components/Onboarding';
// import InitializeSocket from '../shared/helpers/InitializeSocket';

import { ROLES } from './config/roles';
import { PersistLogin } from '@features/authentication/hoc/PersistLogin';
import { Prefetch } from '@features/authentication/hoc/Prefetch';
import { CheckLoggedIn } from '@features/authentication/hoc/CheckLoggedIn';
import { RequireAuth } from "@features/authentication/hoc/RequireAuth";
import { AuthGuard } from "@features/authentication/hoc/AuthGuard";
// import CommentSection from "@features/home-page/components/Dashboard/CommentSection";
// import DiffViewer from "@features/home-page/components/Dashboard/CommentSection";

import { PageLayout } from "./PageLayout";
import LandingPage from '@features/landing-page/components/Homepage'
import { Pricing } from "./features/landing-page/components/Pricingpage";
import { Team } from "@/features/Team/components/Team";
import { CollabxCalendar } from "./features/calendar/components";

// import { ChatContainer } from "@/features/text-chat/components/Chatbox";
// import { ReactFlowContainer } from "./features/tabs/whiteboard-tab/components/ReactFlow";
// import { AddNodeOnEdgeDrop } from "./features/tabs/whiteboard-tab/components/AutoAddNode";
// import { Example2 } from "./features/tabs/whiteboard-tab/components/Example2";
// import { Example3 } from "./features/tabs/whiteboard-tab/components/Example3";
// import { Example4 } from "./features/tabs/whiteboard-tab/components/Example4";
// import { Chatpage } from "./Pages/Chat";


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path="/register" element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Route>
    </Routes>
  )
};

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* <Route element={<VoiceAssistant />} > */}

        <Route element={<CheckLoggedIn />}>
          <Route element={<AuthGuard />}>
            <Route index element={<LandingPage />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/auth/*' element={<AuthRoutes />} />
          </Route>
        </Route>

        {/* <Route path='/example2' element={<Example2 />} />
          <Route path='/example3' element={<Example3 />} />
          <Route path='/example4' element={<Example4 />} />
          <Route index element={<ReactFlowContainer />} /> */}

        {/* Important Higher order components */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />} >
              {/* <Route element={<InitializeSocket />}> */}
              <Route
                path="/*"
                element={<PageLayout />}
              >
                <Route path='teams' element={<Team />} />
                <Route path='calendar' element={<CollabxCalendar />} />

                {/* <Route path='dashboard' element={<Cards />} /> */}

                {/* <Route path='onboarding' element={<Onboarding />} /> */}
                {/* <Route path='chats' element={<ChatContainer />} /> */}

                {/* <Route path='create-classroom' element={<Classroom />} />
                    <Route path='create-classroom/group-details/:groupId' element={<TeamDetails />} />
                    <Route path='create-classroom/room/:roomId' element={<Room />} />
                    <Route path='create-classroom/room/:roomId/player' element={<VideoPlayer />} /> */}

                {/* <Route path='/room/sfu/join/:roomId' element={<RoomSfu />} /> */}
                {/* <Route path='/room/mesh/join/:roomId' element={<RoomMesh />} /> */}

                {/* <Route path='chats' element={<Chatpage />} />
                    <Route path='youtube-streaming' element={<YoutubeStreaming />} />
                    <Route path='conduct-interviews' element={<EditorContainer />} />
                    <Route path='docs-editor' element={<DocsEditor />} /> */}

              </Route>
              {/* </Route> */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  )
}

export default App;

