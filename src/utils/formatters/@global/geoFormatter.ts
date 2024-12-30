// Formatações dedicadas à organizações geolocalizadas.
// Pode-se organizar e misturar diferentes tipos de localizações e retornar numa formatação

// Adicione novas formatações conforme necessário.



// Usado principalmente para os dados brutos do aeroporto.
export const formatLocation = (sigla: string, nome: string, uf: string): string => {
    return `${nome} (${sigla}) - ${uf}`;
};

// formatLocation("SBCF", "Confins", "MG"); --> "Confins (SBCF) - MG"
// formatLocation(teste["NOME"], teste["SIGLA"], teste["UF"]); --> "Confins (SBCF) - MG"


  