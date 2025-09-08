import { downloadMinIOFile } from "@/lib/minio";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        const paginationBuffer = await downloadMinIOFile('pagination.json');

        const paginationText = new TextDecoder().decode(paginationBuffer);
        const pagination = JSON.parse(paginationText);

        return NextResponse.json(pagination, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
    } catch (error) {
        console.error('Erro ao buscar paginação:', error);

        return NextResponse.json({
            error: 'Erro ao buscar paginação',
            message: error instanceof Error ? error.message : 'Erro desconhecido'
        }, 
        { status: 500 } )
    }
} 