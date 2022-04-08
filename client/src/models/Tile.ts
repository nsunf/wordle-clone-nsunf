export type TileState = 'right'|'wrong position'|'wrong'|'normal'; 
export interface ITile {
  char: string;
  state: TileState;
}