export type TileState = 'right'|'wrong position'|'wrong'|'normal'; 

export interface ITile {
  char: string;
  state: TileState;
}

export function tileToInt(tile: ITile) {
  switch (tile.state) {
    case 'right': return 0;
    case 'wrong position': return 1;
    case 'wrong': return 2;
    case 'normal': return 3;
  }
}