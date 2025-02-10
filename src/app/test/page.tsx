"use client";
import { useEffect, useState } from "react";
import MapComponent from "@/components/test/MapComponent"; // Importe o componente MapComponent

export default function TestPage() {
  const [data, setData] = useState(null); // Estado para armazenar os dados da API
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para capturar erros

  useEffect(() => {
    // Função para buscar os dados da API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/porto/charts/coords/2023",
          {
            headers: {
              // Adicione o cabeçalho de autorização com login e senha
              Authorization: "Basic " + btoa("italo:observatorio"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData); // Armazena os dados no estado
        setLoading(false); // Finaliza o carregamento
      } catch (err) {
        setError(err.message); // Captura e armazena o erro
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchData(); // Chama a função ao carregar a página
  }, []);

  // Exibe uma mensagem de carregamento enquanto os dados são buscados
  if (loading) {
    return <p>Carregando dados...</p>;
  }

  // Exibe uma mensagem de erro se ocorrer algum problema
  if (error) {
    return <p>Erro ao carregar os dados: {error}</p>;
  }

  // Renderiza o componente MapComponent com os dados recebidos
  return (
    <div>
      <h1>Mapa de Coordenadas dos Portos</h1>
      <MapComponent data={data} />
    </div>
  );
}