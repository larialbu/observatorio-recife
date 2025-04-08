export interface IDrawing {
    id: string;
    name: string;
    data: any;
    createdAt: number;
    updatedAt: number;
    thumbnail?: any;
  }
  
  class DrawingStore {
    static getAllDrawings(): IDrawing[] {
      const drawings = localStorage.getItem("drawings");
      return drawings ? JSON.parse(drawings) : [];
    }
  
    static saveAllDrawings(drawings: IDrawing[]): void {
      localStorage.setItem("drawings", JSON.stringify(drawings));
    }
  
    static async newDrawing(name: string = "Untitled"): Promise<IDrawing> {
      const drawings = this.getAllDrawings();
      const newDrawing: IDrawing = {
        id: "drawing:" + Date.now(),
        name,
        data: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      drawings.push(newDrawing);
      this.saveAllDrawings(drawings);
      return newDrawing;
    }
  
    static async saveCurrentDrawing(drawing: IDrawing): Promise<void> {
      const drawings = this.getAllDrawings();
      const index = drawings.findIndex((d) => d.id === drawing.id);
      if (index >= 0) {
        drawings[index] = { ...drawing, updatedAt: Date.now() };
      } else {
        drawings.push(drawing);
      }
      this.saveAllDrawings(drawings);
    }
  
    static async loadDrawing(id: string): Promise<IDrawing | null> {
      const drawings = this.getAllDrawings();
      const drawing = drawings.find((d) => d.id === id);
      return drawing || null;
    }
  
    static async deleteDrawing(id: string): Promise<void> {
      let drawings = this.getAllDrawings();
      drawings = drawings.filter((d) => d.id !== id);
      this.saveAllDrawings(drawings);
    }
  }
  
  export { DrawingStore };
  