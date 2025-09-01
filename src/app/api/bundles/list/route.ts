import { NextRequest, NextResponse } from 'next/server';
import { listMinIOFiles } from '@/lib/minio';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const directory = searchParams.get('directory') || '*';
    
    const files = await listMinIOFiles(directory);
    
    return NextResponse.json({ 
      files,
      directory,
      count: files.length,
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
    
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao listar arquivos',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
        files: [],
        count: 0,
      },
      { status: 500 }
    );
  }
}