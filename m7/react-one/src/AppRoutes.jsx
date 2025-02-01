// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import PostsPage, { Post, PostList } from "./components/PostsPage"
import NavBar from "./components/exNavBar";
//
import { Routes, Route } from "react-router-dom";

import TestRoute from "./components/TestRoutes";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
import PostsPage from "./components/PostsPage";
import PostList from "./components/PostList";
import Post from "./components/Post";

function AppRoutes(props) {
    return (
        <>
            <Routes>
                <Route index element={<TestRoute {...props} />} />
                <Route path="/posts" element={<PostsPage {...props} />}>
                    <Route index element={<PostList />} />
                    {/* dynamic param taken from route, stored in variable called id */}{" "}
                    <Route path=":postId" element={<Post />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
export default AppRoutes;
//
function AppRoutes(props) {
    return (
        <Routes>
            <NavBar/>
            {/* index matches on default/home URL: / */}
            {/* <Route index element={<Homepage {...props} />} /> */}
            {/* nested routes, matches on /dash/messages etc */}
            {/* <Route path="dash" element={<DashboardPage {...props} />}> */}
                {/* <Route path="messages" element={<DashboardMessages />} /> */}
                {/* <Route path="tasks" element={<DashboardTasks />} /> */}
            {/* </Route> */}
            {/* <Route path="/about" element={<AboutPage {...props} />} /> */}
            {/* special route to handle if none of the above match */}
            {/* <Route path="*" element={<PageNotFound />} /> */}
            <Route index element={<Homepage {...props} />} />

        {/* add new Route branch */}
        <Route path='/posts' element={<PostsPage {...props} />} >
            <Route index element={<PostList />} />
            {/* dynamic param taken from route, stored in variable called id */}
            <Route path=":id" element={<Post />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;
// Name this file AppRoutes.jsx and store in new folder 'routes'
