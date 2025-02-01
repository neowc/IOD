import Link from "next/link";
import styles from "../page.module.css";
// Save as page.jsx in app/about
export default function About() {
    return (
        <main className={styles.main}>
        <div className="About">
            <h1>Dashboard</h1>
            <p>
            This is the Dashboard page. Nothing to see, go <Link href="/">home</Link>.
            </p>
        </div>
        </main>
    );
}
// Check http://localhost:3000/about to see it in action
