import { NextRequest, NextResponse } from 'next/server';
import { downloadMinIOFile } from '@/lib/minio';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;
    
    if (!filename) {
      return NextResponse.json(
        { error: 'Nome do arquivo é obrigatório' },
        { status: 400 }
      );
    }

    const decodedFilename = decodeURIComponent(filename);
    
    const fileBuffer = await downloadMinIOFile(decodedFilename);
    
    let contentType = 'application/octet-stream';
    if (decodedFilename.endsWith('.json')) {
      contentType = 'application/json';
    } else if (decodedFilename.endsWith('.parquet')) {
      contentType = 'application/octet-stream';
    } else if (decodedFilename.endsWith('.rar')) {
      contentType = 'application/x-rar-compressed';
    }
    
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${decodedFilename}"`,
      'Content-Length': fileBuffer.byteLength.toString(),
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  });
      
  } catch (error) {
    console.error(`Erro ao baixar arquivo ${params.filename}:`, error);
    
    if (error instanceof Error && error.message.includes('404')) {
      return NextResponse.json(
        { error: 'Arquivo não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Erro ao baixar arquivo',
        message: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  }
}