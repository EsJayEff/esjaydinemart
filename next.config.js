/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.sanity.io",
                port: "",
                pathname: "/**",
            },
           
            // {
            //     protocol: "https",
            //     hostname: "abdulbasit-self.vercel.app",
            //     port: "",
            //     pathname: "/**",
            // },

            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "sigc.edu",
                port: "",
                pathname: "/**",
            },
       ],
    },

    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
