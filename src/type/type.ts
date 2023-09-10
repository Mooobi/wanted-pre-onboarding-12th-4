export type graph = {
  id: string;
  value_area: number;
  value_bar: number;
};

export type graphList = {
  [timestamp: string]: graph;
};
