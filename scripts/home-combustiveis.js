const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = process.cwd();

const iconsPath = path.join(root, "src", "components", "home", "ExploreIconsObservatorio.tsx");
const itemPath = path.join(root, "src", "components", "home", "ExploreItem.tsx");
const backupDir = path.join(root, ".backup-home-combustiveis");

function read(file) {
  if (!fs.existsSync(file)) throw new Error(`Arquivo não encontrado: ${file}`);
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  fs.mkdirSync(backupDir, { recursive: true });
  const backupFile = path.join(backupDir, path.basename(file));
  if (!fs.existsSync(backupFile)) fs.copyFileSync(file, backupFile);
}

function gitShow(file) {
  const refs = ["origin/master", "origin/main", "master", "main"];

  for (const ref of refs) {
    try {
      return execSync(`git show ${ref}:${file}`, {
        cwd: root,
        encoding: "utf8",
        stdio: ["pipe", "pipe", "ignore"],
      });
    } catch {}
  }

  throw new Error(`Não consegui buscar ${file} no Git. Rode: git fetch origin`);
}

function restoreOriginalFilesFromGit() {
  backup(iconsPath);
  backup(itemPath);

  write(
    iconsPath,
    gitShow("src/components/home/ExploreIconsObservatorio.tsx")
  );

  write(
    itemPath,
    gitShow("src/components/home/ExploreItem.tsx")
  );

  console.log("Arquivos da home restaurados usando a versão original do Git.");
}

function patchExploreItem() {
  let code = read(itemPath);

  const oldOneLine =
    "const progresso = item.bundleKey ? bundleProgress[item.bundleKey] || 0 : 0; const isLinkDisabled = progresso < 100;";

  const replacement =
`const progresso = item.alwaysEnabled
    ? 100
    : item.bundleKey
    ? bundleProgress[item.bundleKey] || 0
    : 0;

  const isLinkDisabled = item.disabled ? true : progresso < 100;`;

  if (code.includes("item.alwaysEnabled")) {
    console.log("ExploreItem.tsx já suporta alwaysEnabled.");
    return;
  }

  if (code.includes(oldOneLine)) {
    code = code.replace(oldOneLine, replacement);
  } else {
    const regex =
      /const\s+progresso\s*=\s*item\.bundleKey\s*\?\s*bundleProgress\[item\.bundleKey\]\s*\|\|\s*0\s*:\s*0\s*;\s*const\s+isLinkDisabled\s*=\s*progresso\s*<\s*100\s*;/;

    if (!regex.test(code)) {
      throw new Error("Não achei o bloco do progresso no ExploreItem.tsx.");
    }

    code = code.replace(regex, replacement);
  }

  write(itemPath, code);
  console.log("ExploreItem.tsx corrigido sem alterar o visual dos ícones.");
}

const fuelIconFunction = `
function FuelIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22 64V18C22 15.8 23.8 14 26 14H45C47.2 14 49 15.8 49 18V64"
        stroke="#0155AE"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="29" y="22" width="13" height="13" rx="2" fill="#0155AE" />
      <path
        d="M17 64H55"
        stroke="#0155AE"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M49 27H55C57.2 27 59 28.8 59 31V49C59 52.3 56.3 55 53 55H49"
        stroke="#0155AE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M59 31L65 37V46"
        stroke="#0155AE"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M30 45H41" stroke="#0155AE" strokeWidth="5" strokeLinecap="round" />
      <path d="M30 54H41" stroke="#0155AE" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

`;

const fuelItem = `      {
        id: 11,
        label: "Preços de combustíveis",
        icon: <FuelIcon className="text-[#0155AE]" />,
        logo: (
          <svg viewBox="0 0 52 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text
              x="2"
              y="13"
              fill="#0155AE"
              fontSize="12"
              fontFamily="Arial, sans-serif"
              fontWeight="700"
            >
              ANP
            </text>
          </svg>
        ),
        href: "/observatorio/combustiveis?tab=geral",
        tags: [
          "combustíveis",
          "combustiveis",
          "anp",
          "gasolina",
          "gasolina comum",
          "gasolina aditivada",
          "etanol",
          "diesel",
          "óleo diesel",
          "oleo diesel",
          "glp",
          "gnv",
          "postos",
          "preço médio",
          "preco medio",
          "revenda",
        ],
        bundleKey: "combustiveis",
        alwaysEnabled: true,
      },
`;

function addAlwaysEnabledToWorkingCards(code) {
  const workingKeys = [
    "aeroporto",
    "porto",
    "ipca",
    "balanco-comercial",
    "ranking",
    "empresas",
    "empregos",
    "pib",
    "combustiveis",
  ];

  for (const key of workingKeys) {
    const regex = new RegExp(
      `(bundleKey:\\s*["']${key}["'])(?!\\s*,\\s*alwaysEnabled)`,
      "g"
    );

    code = code.replace(regex, `$1, alwaysEnabled: true`);
  }

  return code;
}

function insertFuelIconFunction(code) {
  if (code.includes("function FuelIcon") || code.includes("const FuelIcon")) {
    return code;
  }

  const index = code.indexOf("export const iconsExplore");

  if (index === -1) throw new Error("Não achei export const iconsExplore.");

  return code.slice(0, index) + fuelIconFunction + code.slice(index);
}

function insertFuelItemBeforeCapag(code) {
  if (code.includes('label: "Preços de combustíveis"')) return code;

  const lines = code.split(/\r?\n/);
  const capagLineIndex = lines.findIndex((line) =>
    line.includes('label: "CAPAG - Capacidade de Pagamento"')
  );

  if (capagLineIndex === -1) {
    throw new Error("Não achei o card CAPAG para inserir antes dele.");
  }

  let startIndex = capagLineIndex;
  while (startIndex > 0 && !lines[startIndex].trim().startsWith("{")) {
    startIndex -= 1;
  }

  lines.splice(startIndex, 0, fuelItem.replace(/\n$/, ""));
  return lines.join("\n");
}

function patchExploreIcons() {
  let code = read(iconsPath);

  code = insertFuelIconFunction(code);
  code = insertFuelItemBeforeCapag(code);
  code = addAlwaysEnabledToWorkingCards(code);

  write(iconsPath, code);
  console.log("ExploreIconsObservatorio.tsx atualizado preservando os ícones originais.");
}

restoreOriginalFilesFromGit();
patchExploreItem();
patchExploreIcons();

console.log("");
console.log("Pronto. Agora rode:");
console.log("rd /s /q .next");
console.log("npm.cmd run build");
console.log("npx.cmd next start -p 3000");
