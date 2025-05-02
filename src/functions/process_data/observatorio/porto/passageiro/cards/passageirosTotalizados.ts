import { PortoPassageirosHeaders } from "@/@types/observatorio/@fetch/porto";

export const processPassageirosTotalizados = (
    data: PortoPassageirosHeaders[]
): number => {
    return data.reduce((acc: number, mov) => acc + mov.Passageiros, 0);
};
  