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
  