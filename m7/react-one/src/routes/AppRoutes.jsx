import { Routes, Route } from "react-router-dom";

import TestRoute from "./components/TestRoutes";
import PageNotFound from "./components/PageNotFound";
import NavBar from "./components/NavBar";
import PostsPage from "../components/PostsPage";
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
