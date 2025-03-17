import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileUrl = process.env.NEXT_PUBLIC_API_BUNDLE_URL;
const fileName = process.env.NEXT_PUBLIC_API_BUNDLE_NAME;

async function fetchAndSaveFile(fileUrl, fileName) {

    const filePath = path.join(__dirname, 'public', fileName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Arquivo antigo removido do diretório public/');
    }

    const response = await fetch(fileUrl);

    if (!response.ok) {
        throw new Error(`Erro ao baixar o arquivo: ${response.statusText}`);
    }

    const fileStream = fs.createWriteStream(filePath);
    response.body.pipe(fileStream);

    fileStream.on('finish', () => {
        console.log('Arquivo baixado com sucesso para o diretório public/');
    });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (!isServer) {
            return config;
        }

        fetchAndSaveFile(fileUrl, fileName).catch((error) => {
            console.error('Erro ao baixar o arquivo via URL:', error);
        });

        return config;
    },
};

export default nextConfig;
