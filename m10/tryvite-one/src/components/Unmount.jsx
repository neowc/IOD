
import { useEffect } from 'react';

export default function Unmount() {
    useEffect(() => {
        return () => {
            console.log("Component unmounted");
        };
    }, []);

    return (
        <div> Un-mount component </div>
    );
}

