export type data = {
  id: string;
  value_area: number;
  value_bar: number;
};

export type dataList = {
  [timestamp: string]: data;
};

export type prcessedData = {
  time: string;
  id: string;
  value_bar: number;
  value_area: number;
};
