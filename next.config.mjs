import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

// Resolve diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileUrl = process.env.NEXT_PUBLIC_API_BUNDLE_URL;
const fileName = process.env.NEXT_PUBLIC_API_BUNDLE_NAME;

if (!fileUrl || !fileName) {
    console.warn('Variáveis de ambiente NEXT_PUBLIC_API_BUNDLE_URL ou NEXT_PUBLIC_API_BUNDLE_NAME não definidas.');
}

async function fetchAndSaveFile(fileUrl, fileName) {
    try {
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

    } catch (error) {
        console.error('Erro durante o download do arquivo:', error);
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (isServer && fileUrl && fileName) {
            fetchAndSaveFile(fileUrl, fileName);
        }

        return config;
    },
};

export default nextConfig;
