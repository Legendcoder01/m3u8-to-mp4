const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        outputFileTracingIncludes: {
            '/api/convert': [
                './node_modules/ffmpeg-static/**/*',
            ],
        },
    },
};

module.exports = withNextIntl(nextConfig);
