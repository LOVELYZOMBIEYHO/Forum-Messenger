/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "static.xx.fbcdn.net",
      "upload.wikimedia.org",
      "cdn.pixabay.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
    ],
  },
  experimental: {
    appDir: true,
  },
};
