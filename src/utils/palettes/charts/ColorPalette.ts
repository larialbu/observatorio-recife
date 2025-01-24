// Como usar: Adicione diversos casos de uso de paletas que você acha que podem se repetir.
// Dedique esta sessão para colorir os gráficos de diversos tipos!

class ColorPalette {
  static default = [
    "#EC6625",
    "#0155AE",
    "#52B348",
    "#FFBB28",
    "#8A2BE2",
    "#00CED1",
    "#FF6F61",
    "#4B0082",
    "#FFD700",
    "#32CD32",
    "#FF4500",
    "#1E90FF",
    "#FF1493",
    "#20B2AA",
    "#6A5ACD",
    "#FF8C00",
    "#ADFF2F",
    "#FF6347",
    "#7B68EE",
    "#DDA0DD",
    "#00BFFF",
];
    static pastel = ["#F8B195", "#F67280", "#C06C84", "#6C5B7B", "#355C7D"];
    static vibrant = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#33FFF5"];
    static dark = ["#2C3E50", "#34495E", "#1C2833", "#212F3D", "#2E4053"];
  
    static getPalette(paletteName: string): string[] {
      switch (paletteName) {
        case "pastel":
          return this.pastel;
        case "vibrant":
          return this.vibrant;
        case "dark":
          return this.dark;
        default:
          return this.default;
      }
    }
  }
  
  export default ColorPalette;
  