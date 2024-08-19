export interface Widget {
    id: number;
    name: string;
    text: string;
}
export interface Category {
  id: number;
  name: string;
  widgets: Widget[];
}
  