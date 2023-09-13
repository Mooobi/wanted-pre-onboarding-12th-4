import { dataList } from '../type/type';
import { DATE_SLICE_INDEX } from '../constants/constants';

export default function processMockData(data: dataList) {
  const time = Object.keys({ ...data }).map((time) => time.slice(DATE_SLICE_INDEX));

  const processedData = Object.values({ ...data }).map((item, idx) => ({
    time: time[idx],
    id: item.id,
    value_bar: item.value_bar,
    value_area: item.value_area,
  }));

  return processedData;
}
