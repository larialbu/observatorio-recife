import { PortoCargaHeaders, PortoDestinoHeaders } from "@/@types/observatorio/@fetch/porto";


export function getPortoCountryNameByCode(cargaArray: PortoCargaHeaders[], origemArray: PortoDestinoHeaders[], nomeOrigem: 'Origem' | 'Destino') {
    // First, we map and add the `Country ${nomeOrigem}` to the carga objects
    const cargaWithCountry = cargaArray.map((carga: any) => {
        // Finding the origin in the second array based on the passed field name
        const origemInfo = origemArray.find((origem: any) => origem[nomeOrigem]?.toLowerCase() === carga['codigo'].toLowerCase());

        // If the origin is found, add the country to the carga object
        if (origemInfo) {
            carga[`País ${nomeOrigem}`] = origemInfo[`País ${nomeOrigem}`];
        }

        return carga;
    });

    // Now, let's group the objects by `Country ${nomeOrigem}` and sum the values
    const groupedByCountry: { [country: string]: {pais: string, totalVLPesoCargaBruta: number} } = {};

    cargaWithCountry.forEach((carga) => {
        const country = carga[`País ${nomeOrigem}`];

        if (!groupedByCountry[country]) {
            // If the country doesn't exist yet, create the entry
            groupedByCountry[country] = {
                pais: country,
                totalVLPesoCargaBruta: carga.totalVLPesoCargaBruta
            };
        } else {
            // If the country already exists, sum the values
            groupedByCountry[country].totalVLPesoCargaBruta += carga.totalVLPesoCargaBruta;
        }
    });

    // Convert the grouped object into an array and sort by totalVLPesoCargaBruta in descending order
    const resultArray = Object.values(groupedByCountry).sort((a, b) => b.totalVLPesoCargaBruta - a.totalVLPesoCargaBruta);

    return resultArray;
}
