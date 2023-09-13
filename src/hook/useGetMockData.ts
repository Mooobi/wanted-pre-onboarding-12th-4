import { useEffect, useState } from 'react';
import { MockService } from '../service/mockService';
import { prcessedData } from '../type/type';
import processMockData from '../util/processMockData';

const useGetMockData = () => {
  const [data, setData] = useState<prcessedData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const mockService = new MockService();
      const data = await mockService.get();

      const processedData = processMockData(data);

      setData(processedData);
    }

    fetchData();
  }, []);

  return { data };
};

export default useGetMockData;
