const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const { checkAndUpdateManifest } = require('./next.config.mjs');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.NEXT_PUBLIC_API_PORT;
let app;
let server;

async function startServer() {

  app = next({ dev });
  const handle = app.getRequestHandler();

  try {
    await app.prepare();
    
    server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
        console.log("Servidor iniciado.")
      startPeriodicChecks();
    });
    
    return server;
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

function startPeriodicChecks() {
  console.log('🔄 Iniciando verificações periódicas de bundles...');
  
  const checkInterval = setInterval(async () => {
    console.log('🔄 Verificando atualizações dos bundles...');
    
    try {
      const { needsRestart } = await checkAndUpdateManifest();
      
      if (needsRestart) {
        console.log('🔄 Bundles atualizados. Reiniciando servidor...');
        clearInterval(checkInterval);
        restartServer();
      }
    } catch (error) {
      console.error('❌ Erro ao verificar atualizações:', error);
    }
  }, 60 * 1000);
}

async function restartServer() {
  try {

    if (server) {
      server.close(() => {
        console.log('✅ Servidor fechado. Iniciando novo servidor...');
        
        startServer();
      });
    } else {
      startServer();
    }
  } catch (error) {
    console.error('❌ Erro ao reiniciar o servidor:', error);
    process.exit(1);
  }
}

startServer().catch(console.error);