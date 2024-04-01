// import Cards from '@features/home-page/components/Cards';
// import YoutubeStreaming from '@features/youtube-streaming/pages/YoutubeStreaming';
// import Classroom from '@features/classroom/pages/Classroom';
// import Room from '@features/classroom/pages/Room';
// import { VideoPlayer } from '@features/embedded/video-player/VideoPlayer';
// import { EditorContainer } from '@features/code-collaboration/pages/InterviewRoom';
// import { DocsEditor } from '@features/docs-editor/pages/DocsEditor';
// import { PublicPage } from '@features/public-pages/pages/PublicPage';
// import { Register } from '@features/authentication/pages';
// import { Login } from '@features/authentication/pages';
// import { TeamDetails } from '@features/classroom/components/TeamDetails/TeamDetails';
// import { Onboarding } from '@features/home-page/components/Onboarding';
// import CommentSection from "@features/home-page/components/Dashboard/CommentSection";
// import DiffViewer from "@features/home-page/components/Dashboard/CommentSection";
// import { ChatContainer } from "@/features/text-chat/components/Chatbox";
// import { ReactFlowContainer } from "./features/tabs/whiteboard-tab/components/ReactFlow";
// import { AddNodeOnEdgeDrop } from "./features/tabs/whiteboard-tab/components/AutoAddNode";
// import { Example2 } from "./features/tabs/whiteboard-tab/components/Example2";
// import { Example3 } from "./features/tabs/whiteboard-tab/components/Example3";
// import { Example4 } from "./features/tabs/whiteboard-tab/components/Example4";
// const CollabxCalendar = React.lazy(() => import('@features/calendar/components/Calendar'));
// import Register from "./features/authentication/components/Register";
// import Login from "./features/authentication/components/Login";
// import LandingPage from "@features/landing-page/components/Homepage";
// import Chatpage from "@features/text-chat/components/ChatPage";
// import Team from "@features/Team/components/Team";
// import Pricing from "@features/landing-page/components/Pricingpage";

import React from "react";
import Layout from "./Layout";
import { Routes, Route } from 'react-router-dom';
import PageLayout from "./PageLayout";
import { ROLES } from './config/roles';
import { PersistLogin } from '@features/authentication/hoc/PersistLogin';
import { Prefetch } from '@features/authentication/hoc/Prefetch';
import { CheckLoggedIn } from '@features/authentication/hoc/CheckLoggedIn';
import { RequireAuth } from "@features/authentication/hoc/RequireAuth";
import { AuthGuard } from "@features/authentication/hoc/AuthGuard";
import InitializeSocket from '../shared/helpers/InitializeSocket';

const Register = React.lazy(() => import('@features/authentication/components/Register'));
const Login = React.lazy(() => import('@features/authentication/components/Login'));
const LandingPage = React.lazy(() => import('@features/landing-page/components/Homepage'));
const Chatpage = React.lazy(() => import('@features/text-chat/components/ChatPage'));
const Team = React.lazy(() => import('@features/Team/components/Team'));
const Pricing = React.lazy(() => import('@features/landing-page/components/Pricingpage'));
const Setting = React.lazy(() => import('@features/settings/components/index'));
const AnalyticsPage = React.lazy(() => import('@features/analytics/components'));
const RoomMesh = React.lazy(() => import('@features/video-chat/mesh-topology/pages/RoomMesh'));
const RoomSfu = React.lazy(() => import('@/features/video-chat/sfu-topology/pages/RoomSfu'));
const ActivityPage = React.lazy(() => import('@/features/activity/components'));
const PollPage = React.lazy(() => import('@features/polling/components/page'));

const Example2 = () => {
  return (
    <>
      <p>Skeleton might be good here</p>
      <p>Loading...</p>
      <p>Try to make one loader</p>
    </>
  )
};
const DashBoard = () => {
  return (
    <>
      <p>Showing dashboard page in auth component table</p>
    </>
  )
}
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
              <Route element={<InitializeSocket />}>
                <Route
                  path="/*"
                  element={<PageLayout />}
                >
                  <Route path='dashboard' element={<DashBoard />} />
                  <Route path='activity' element={<ActivityPage />} />
                  <Route path="polling" element={<PollPage />} />
                  <Route path='settings' element={<Setting />} />
                  <Route path="teams/:teamId/channels/:channelId" element={<Team />} />
                  <Route path='calendar' element={<Example2 />} />
                  <Route path='chats' element={<Chatpage />} />
                  <Route path='calls' element={<AnalyticsPage />} />
                  <Route path='room/sfu/join/:roomId' element={<RoomSfu />} />
                  <Route path='room/mesh/join/:roomId' element={<RoomMesh />} />

                  {/* <Route path='dashboard' element={<Cards />} /> */}
                  {/* <Route path='onboarding' element={<Onboarding />} /> */}
                  {/* <Route path='chats' element={<ChatContainer />} /> */}
                  {/* <Route path='create-classroom' element={<Classroom />} />
                    <Route path='create-classroom/group-details/:groupId' element={<TeamDetails />} />
                    <Route path='create-classroom/room/:roomId' element={<Room />} />
                    <Route path='create-classroom/room/:roomId/player' element={<VideoPlayer />} /> */}
                  {/* <Route path='youtube-streaming' element={<YoutubeStreaming />} /> */}
                  {/* <Route path='conduct-interviews' element={<EditorContainer />} /> */}
                  {/* <Route path='docs-editor' element={<DocsEditor />} /> */}
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  )
};

export default App;

