/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

export default nextConfig;
