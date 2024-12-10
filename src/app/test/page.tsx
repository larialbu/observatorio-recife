"use client";

import "../styles/home/style.scss";
import "../styles/explore/style.scss";
import React, { useEffect, useState } from "react";

import { AeroportoData } from "@/@api/http/to-charts/aeroporto/AeroportoData";

const Test = () => {
  const [bruteData, setBruteData] = useState([]) as any;
  const [year, setYear] = useState("2023");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aeroporto = new AeroportoData(year);
        const data = await aeroporto.fetchBruteData();


        setBruteData(data);

      } catch (error) {
        setError("Erro ao buscar dados brutos. Tente novamente mais tarde.");
        console.error("Erro ao buscar dados brutos:", error);
        
      }
    };

    fetchData();
  }, [year]);

  return (
    <div>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <h1>Dados do Ano {year}</h1>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </select>
          <pre>{JSON.stringify(bruteData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Test;
