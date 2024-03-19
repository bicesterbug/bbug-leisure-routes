"use client"

import Image from "next/image";
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer"

export default function Viewer() {
    const searchParams = useSearchParams();
    const path = searchParams.get('path') ?? '';
    return (
        
        <ReactPhotoSphereViewer src={path} height={'100vh'} width={'100%'} />
    )
}