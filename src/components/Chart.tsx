import { Area, Bar, Cell, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import useGetMockData from '../hook/useGetMockData';
import { useState } from 'react';
import FilteringButton from './FilteringButton';
import { prcessedData } from '../type/type';

interface TooltipData {
  active: boolean;
  payload: Array<{
    dataKey: string;
    value: number;
    payload: prcessedData;
  }>;
}

const Chart = () => {
  const [filteredId, setFilteredId] = useState('기본');
  const { data } = useGetMockData();

  const handleBarClick = (entry: prcessedData) => {
    setFilteredId(entry.id);
  };

  return (
    <Wrapper>
      <FilteringButton onFilter={setFilteredId} filteredId={filteredId} />
      <ComposedChart width={1280} height={700} data={data ? data : undefined}>
        <XAxis
          dataKey='time'
          label={{ value: '2023.02.01.', position: 'insideLeft' }}
          interval='equidistantPreserveStart'
          height={80}
        />
        <YAxis
          dataKey='value_bar'
          label={{ value: 'Bar', angle: -90, position: 'insideLeft' }}
          width={80}
        />
        <YAxis
          yAxisId='right'
          orientation='right'
          dataKey='value_area'
          label={{ value: 'Area', angle: 90, position: 'insideRight' }}
          domain={['dataMin', 200]}
        />
        <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
        <Legend
          verticalAlign='top'
          payload={[
            { value: 'value_bar', type: 'square', color: '#95aeec' },
            { value: 'value_area', type: 'square', color: '#ff6a00' },
          ]}
        />
        <Bar dataKey='value_bar' isAnimationActive={false} onClick={handleBarClick}>
          {data?.map((entry, index) => (
            <Cell
              key={index}
              cursor='pointer'
              fill={entry.id === filteredId ? '#517deb' : '#95aeec'}
            />
          ))}
        </Bar>
        <Area
          dataKey='value_area'
          fill='#ff6a00'
          stroke='none'
          yAxisId='right'
          isAnimationActive={false}
        />
      </ComposedChart>
    </Wrapper>
  );
};

export default Chart;

const CustomTooltip: React.FC<TooltipData> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <TooltipWrapper className='custom-tooltip'>
        <p>ID: {data.payload.id}</p>
        <p>Value_Bar: {data.payload.value_bar}</p>
        <p>Value_Area: {data.payload.value_area}</p>
        <p>Time: {data.payload.time}</p>
      </TooltipWrapper>
    );
  }

  return null;
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TooltipWrapper = styled.div`
  background: rgba(230, 230, 230, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
  p {
    color: #434343;
  }
`;
