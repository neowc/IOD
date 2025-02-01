import Link from "next/link";

export default async function Posts({ searchParams }) {
    const limit = searchParams.limit || 10;
    const posts = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
    ).then((res) => res.json());

    return (
        <main>
            <div className="Posts">
                <h1>Posts</h1>
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/posts/${post.id}`}>{post.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}