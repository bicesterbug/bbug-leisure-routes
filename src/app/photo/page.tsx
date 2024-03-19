import { Suspense } from "react";
import Viewer from "./Viewer";

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Viewer />
        </Suspense>
        
    )
}