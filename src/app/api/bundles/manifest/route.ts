import { NextResponse } from 'next/server';
import { downloadMinIOFile } from '@/lib/minio';

export async function GET() {
  try {
    const manifestBuffer = await downloadMinIOFile('manifest.json');
    
    const manifestText = new TextDecoder().decode(manifestBuffer);
    const manifest = JSON.parse(manifestText);
    
    return NextResponse.json(manifest, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error('Erro ao buscar manifest:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao buscar manifest',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}