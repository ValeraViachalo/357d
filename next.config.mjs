/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.beta.cosmos.so',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '357d.twid.studio',
        port: '',
        pathname: '/**',
      },
    ],
  },
  sassOptions: {
    includePaths: ['styles'],
    prependData: `
    @import '/src/styles/global';
  `,
    functions: {
      'get($keys)': function (keys) {
        keys = keys.getValue().split('.')
        let result = sassVars
        for (let i = 0; i < keys.length; i++) {
          result = result[keys[i]]
        }
        result = castToSass(result)

        return result
      },
    },
  }
};

export default nextConfig;
