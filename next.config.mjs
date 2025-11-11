/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configurações específicas se necessário
  experimental: {
    // Ativar se precisar de recursos experimentais
  },
}

export default nextConfig;