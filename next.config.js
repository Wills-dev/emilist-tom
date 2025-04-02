/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["emilistapi.vercel.app", "res.cloudinary.com"],
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
