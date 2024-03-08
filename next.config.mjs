/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: process.env.BASE_URL ?? '',
    images: {
        unoptimized: true,
    },
};

export default nextConfig;
