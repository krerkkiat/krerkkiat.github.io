/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        urlImports: ['https://esm.sh/'],
    },
    output: 'export',
    basePath: '',
    images: {
        unoptimized: true,
    },
}

module.exports = nextConfig
