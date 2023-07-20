/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'raw.githubusercontent.com'
            },
            {
                hostname: 'skillicons.dev'
            }
        ]
    }
}

const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
});

module.exports = withPWA(nextConfig);
