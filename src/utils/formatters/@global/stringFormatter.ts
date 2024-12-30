// Formatar strings para as mais diversas utilidades.

// Adicione novas conforme necessário.


// Deixar a primeira letra maiúscula
export const capitalizeWords = (text: string): string => {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};

// capitalizeWords("confins"); --> "Confins"
  

// Remover espaços desnecessários.
  export const cleanString = (text: string): string => {
    return text.trim().replace(/\s+/g, " ");
};

// cleanString("  CONFINS  "); --> "CONFINS"