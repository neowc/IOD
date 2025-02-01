// import Link from "next/link";
// import styles from "../page.module.css";

// export default function About() {
//     return (
//         <main className={styles.main}>
//         <div className="Post">
//             <h1>Post</h1>
//             <p>
//             This is the about page. Nothing to see, go <Link href="/">home</Link>.
//             </p>
//         </div>
//         </main>
//     );
// }

import Link from "next/link";
// Save as app/posts/[id]/page.jsx
async function getPostData(id) {
    const res = await fetch(
        "https://jsonplaceholder.typicode.com/" + "posts/" + id
    );
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch post #" + id);
    }
    return res.json();
}
// Uses params prop to get value of [id] from path segment
export default async function Post({ params }) {
  // so for /posts/3/, params will be { id:3 }
    const post = await getPostData(params.id);
    return (
        <>
        <div className="post">
            {post ? (
            <>
                <h3>Post #{post.id}: </h3>
                <h4>Title:{post.title}</h4>
                <p>{post.body}</p>
            </>
            ) : (
            "Loading ..."
            )}
        </div>
        <Link href="/posts">All Posts</Link>
        </>
    );
} // ++ Try adding Next Post and Previous Post links
