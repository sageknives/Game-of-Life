export class Game {
  private initialPercentage: number;
  private width: number;
  private height: number;
  private cellSize: number;
  private cells: number[][] = [];
  private fillStyle: string;

  constructor(
    width: number,
    height: number,
    cellSize: number,
    initialPercentage = 50,
    fillStyle = "black"
  ) {
    this.fillStyle = fillStyle;
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.initialPercentage = initialPercentage;
    this.repopulate();
  }
  repopulate(initialPercentage?: number) {
    const cells = [];
    for (let x = 0; x < this.width / this.cellSize; x++) {
      const row: number[] = [];
      for (let y = 0; y < this.height / this.cellSize; y++) {
        const active =
          Math.random() < (initialPercentage || this.initialPercentage) / 100;
        row.push(active ? 1 : 0);
      }
      cells.push(row);
    }
    this.cells = cells;
  }
  setCellSize(cellSize: number) {
    this.cellSize = cellSize;
    this.repopulate();
  }
  setStartPercentage(initialPercentage: number) {
    this.initialPercentage = initialPercentage;
    this.repopulate();
  }
  setFillStyle(fillStyle: string) {
    this.fillStyle = fillStyle;
  }
  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.repopulate();
  }
  private getNeighborCount(x: number, y: number) {
    return (
      this.cells[x - 1]?.[y - 1] +
      this.cells[x]?.[y - 1] +
      this.cells[x + 1]?.[y - 1] +
      this.cells[x - 1]?.[y] +
      this.cells[x + 1]?.[y] +
      this.cells[x - 1]?.[y + 1] +
      this.cells[x]?.[y + 1] +
      this.cells[x + 1]?.[y + 1]
    );
  }
  update() {
    const cells: number[][] = [];
    for (let x = 0; x < this.cells.length; x++) {
      const row: number[] = [];
      for (let y = 0; y < this.cells[x].length; y++) {
        const count = this.getNeighborCount(x, y);
        const active = (count === 2 && this.cells[x][y]) || count === 3;
        row.push(active ? 1 : 0);
      }
      cells.push(row);
    }
    this.cells = cells;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.fillStyle;
    for (let x = 0; x < this.cells.length; x++) {
      for (let y = 0; y < this.cells[x].length; y++) {
        if (this.cells[x][y]) {
          ctx.fillRect(
            x * this.cellSize,
            y * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
}
