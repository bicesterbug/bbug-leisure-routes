/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_URL ?? '',
    images: {
        loader: "custom",
        imageSizes: [16, 48, 96, 128, 256, 384],
        deviceSizes: [640, 828, 1080, 1920, 2048, 3840],
      },
      transpilePackages: ["next-image-export-optimizer"],
      env: {
        nextImageExportOptimizer_imageFolderPath: "public/routes",
        nextImageExportOptimizer_exportFolderPath: "out",
        nextImageExportOptimizer_quality: "100",
        nextImageExportOptimizer_storePicturesInWEBP: "true",
        nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
    
        // If you do not want to use blurry placeholder images, then you can set
        // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
        // `placeholder="empty"` to all <ExportedImage> components.
        nextImageExportOptimizer_generateAndUseBlurImages: "true",
    
        // If you want to cache the remote images, you can set the time to live of the cache in seconds.
        // The default value is 0 seconds.
        nextImageExportOptimizer_remoteImageCacheTTL: "0",
      },
};

export default nextConfig;
