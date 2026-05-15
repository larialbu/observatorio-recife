import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.join(__dirname, "public");

function ensurePublicDir() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }
}

function normalizeRepoUrl(value) {
  const raw = String(value || "").trim();

  if (!raw || raw === "undefined" || raw === "null") {
    return "";
  }

  try {
    const url = new URL(raw);
    return url.href.endsWith("/") ? url.href : `${url.href}/`;
  } catch {
    console.warn(
      "NEXT_PUBLIC_API_REPO_URL está inválida. Pulando download de bundles."
    );
    return "";
  }
}

const REPO_URL = normalizeRepoUrl(process.env.NEXT_PUBLIC_API_REPO_URL);
const MANIFEST_URL = REPO_URL ? `${REPO_URL}manifest.json` : "";

function bundlesEnabled() {
  return Boolean(REPO_URL && MANIFEST_URL);
}

async function safeFetchJson(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Erro ao buscar ${url}. Status: ${res.status}`);
  }

  return res.json();
}

export async function fetchFileToPublic(filename, remoteUrl) {
  try {
    if (!bundlesEnabled() || !remoteUrl) {
      console.warn(`Bundles desativados. Pulando download de ${filename}.`);
      return;
    }

    ensurePublicDir();

    const filePath = path.join(PUBLIC_DIR, filename);

    if (fs.existsSync(filePath)) {
      console.log(`✔️ Arquivo já existe: ${filename}`);
      return;
    }

    const res = await fetch(remoteUrl);

    if (!res.ok) {
      throw new Error(`Erro ao baixar ${filename}. Status: ${res.status}`);
    }

    const buffer = await res.arrayBuffer();

    fs.writeFileSync(filePath, Buffer.from(buffer));

    console.log(`✅ Baixado: ${filename}`);
  } catch (error) {
    console.error(
      `❌ Erro ao baixar ${filename}:`,
      error instanceof Error ? error.message : error
    );
  }
}

export async function fetchBundles() {
  try {
    if (!bundlesEnabled()) {
      console.warn(
        "NEXT_PUBLIC_API_REPO_URL não configurada. Pulando download de bundles."
      );
      return {};
    }

    ensurePublicDir();

    const manifest = await safeFetchJson(MANIFEST_URL);

    await fetchFileToPublic("manifest.json", MANIFEST_URL);

    for (const bundle of Object.values(manifest)) {
      if (!bundle || !bundle.filename) continue;

      const filename = bundle.filename;
      const bundleUrl = `${REPO_URL}${filename}`;

      await fetchFileToPublic(filename, bundleUrl);
    }

    return manifest;
  } catch (error) {
    console.error(
      "❌ Erro ao buscar bundles:",
      error instanceof Error ? error.message : error
    );

    return {};
  }
}

export async function checkAndUpdateManifest() {
  try {
    if (!bundlesEnabled()) {
      console.warn(
        "NEXT_PUBLIC_API_REPO_URL não configurada. Pulando verificação de bundles."
      );

      return {
        needsRestart: false,
      };
    }

    ensurePublicDir();

    const newManifest = await safeFetchJson(MANIFEST_URL);
    const currentManifestPath = path.join(PUBLIC_DIR, "manifest.json");

    if (!fs.existsSync(currentManifestPath)) {
      console.log("🔺 Manifest local não encontrado. Baixando...");

      await fetchBundles();

      return {
        needsRestart: false,
      };
    }

    const currentManifest = JSON.parse(
      fs.readFileSync(currentManifestPath, "utf8")
    );

    let needsUpdate = false;

    for (const [bundleKey, bundleInfo] of Object.entries(newManifest)) {
      if (!bundleInfo || !bundleInfo.filename) continue;

      const currentVersion = Number(currentManifest[bundleKey]?.version || 0);
      const remoteVersion = Number(bundleInfo.version || 0);

      if (!currentVersion || remoteVersion > currentVersion) {
        console.log(
          `🔺 Atualizando ${bundleKey} de versão ${
            currentVersion || "inexistente"
          } → ${remoteVersion}`
        );

        const filename = bundleInfo.filename;
        const bundlePath = path.join(PUBLIC_DIR, filename);

        if (fs.existsSync(bundlePath)) {
          fs.unlinkSync(bundlePath);
          console.log(`🗑️ Apagado: ${filename}`);
        }

        needsUpdate = true;
      } else {
        console.log(`✔️ ${bundleKey} já está atualizado (v${remoteVersion})`);
      }
    }

    if (needsUpdate) {
      if (fs.existsSync(currentManifestPath)) {
        fs.unlinkSync(currentManifestPath);
        console.log("🗑️ Apagado: manifest.json");
      }

      await fetchBundles();

      return {
        needsRestart: true,
      };
    }

    return {
      needsRestart: false,
    };
  } catch (error) {
    console.error(
      "❌ Erro ao verificar e baixar bundles:",
      error instanceof Error ? error.message : error
    );

    return {
      needsRestart: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

async function initialBuild() {
  try {
    if (!bundlesEnabled()) {
      console.warn(
        "NEXT_PUBLIC_API_REPO_URL não configurada. Build continuará sem baixar bundles."
      );
      return;
    }

    console.log("🚀 Build inicial: Verificando bundles...");

    await fetchBundles();
  } catch (error) {
    console.error(
      "❌ Erro no build inicial dos bundles:",
      error instanceof Error ? error.message : error
    );
  }
}

initialBuild().catch((error) => {
  console.error(
    "❌ Erro inesperado no initialBuild:",
    error instanceof Error ? error.message : error
  );
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
