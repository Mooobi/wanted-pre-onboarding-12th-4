import { useEffect, useState } from 'react';
import { MockService } from '../service/mockService';
import { graphList } from '../type/type';

const useGetGraph = () => {
  const [graphData, setGraphData] = useState<graphList | null>(null);

  useEffect(() => {
    async function fetchData() {
      const mockService = new MockService();
      const data = await mockService.get();
      setGraphData(data);
    }

    fetchData();
  }, []);

  return { graphData };
};

export default useGetGraph;
