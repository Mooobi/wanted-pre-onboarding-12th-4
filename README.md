## 프로젝트 소개

이 프로젝트는 원티드 프리온보딩 프론트엔드 12기 과정의 4주차 과제로,
주어진 데이터를 기반으로 시계열 차트 만들기를 목표로 합니다.

참여자: 박무생

## 폴더 구조

```
root
└── src/
    ├── components
    ├── constants
    ├── data
    ├── hook
    ├── page
    ├── service
    ├── style
    ├── type
    ├── util
    ├── App.tsx
    └── main.tsx
```

## 실행 방법

위 배포 링크를 클릭하여 배포환경에서 실행하거나,
로컬 환경의 터미널에서 clone 후 npm install, npm run dev 순으로 입력하여 로컬환경에서 실행할 수 있습니다.

```
git clone https://github.com/Mooobi/wanted-pre-onboarding-12th-4.git
npm install
npm run dev
```

## 사용 스택

<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='html5' />
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='css3' />
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white' alt='css3' />
<img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt='ts' />
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='react' />
<img src='https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white' alt='styled_components' />
<img src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white' alt='eslint' />
<img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E' alt='prettier' />

## 요구사항

- 별도의 API는 제공되지 않습니다.
  - 목데이터를 사용해서 과제를 진행해주세요
- 별도의 디자인 명세는 주어지지 않습니다. 요구사항을 충족시키는 선에서 지원자의 판단하에 UI를 구성해주시면 됩니다

1. 시계열 차트 만들기

- 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
- 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
- Area 그래프의 기준값은 `value_area` 값을 이용해주세요
- Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
- 차트의 Y축에 대략적인 수치를 표현해주세요

2. 호버 기능 구현

- 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

3. 필터링 기능 구현

- 필터링 기능을 구현해주세요, 필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현해주세요
- 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
- 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
- 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

## 구현 화면
![Sep-13-2023 16-40-07](https://github.com/Mooobi/wanted-pre-onboarding-12th-4/assets/124570875/4d9b6baf-ce31-4864-bb56-c762858990ff)

## 개발 과정

### 시계열 차트 만들기

#### 1. api 구현, 데이터 정제, 데이터 저장

이 프로젝트에서는 mock data를 사용하지만 확장성을 고려하여 api 기능을 구현하였습니다. 현재 url로 mock data가 저장된 폴더의 경로를 사용하고 있으며, 추후 서버에서 데이터를 받아올 경우 url만 변경하여 사용할 수 있도록 구현했습니다.

1차적으로 mockService에서 api로 promise 객체인 data를 받아오고 useGetGraph 훅으로 data를 정제 및 상태로 저장한 뒤 반환하도록 설계했습니다.

> mockService.ts (API 요청 클래스)

```ts
import { URL } from '../constants/constants';
// interface로 추상 표현
interface mockService {
  get(): Promise<Response | null>;
}
// class로 구체 표현
class MockService implements mockService {
  #url;

  constructor() {
    this.#url = URL;
  }
  // get 메서드에서 fetch 요청 후 promise 객체 반환
  async get() {
    const response = await fetch(this.#url);
    ...
    const data = await response.json();

    return data;
  }
}
```

<br/>

> useGetGraph.ts (받은 데이터 정제 및 상태로 저장 후 반환)

```ts
const useGetMockData = () => {
  const [data, setData] = useState<prcessedData[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const mockService = new MockService();
      const data = await mockService.get(); // 데이터 요청

      const processedData = processMockData(data); // 데이터 정제

      setData(processedData); // 상태 저장
    }

    fetchData();
  }, []);

  return { data }; // 저장된 상태 반환
};
```

<br/>

> processMockData.ts (데이터 정제 함수)

```ts
function processMockData(data: dataList) {
  // 데이터의 키(시간) 분리
  const time = Object.keys({ ...data }).map((time) => time.slice(DATE_SLICE_INDEX));
  // time이라는 요소를 갖는 새로운 객체 생성
  const processedData = Object.values({ ...data }).map((item, idx) => ({
    time: time[idx],
    id: item.id,
    value_bar: item.value_bar,
    value_area: item.value_area,
  }));

  return processedData;
}
```

<br/>

> Chart.tsx

```ts
const Chart = () => {
  const { data } = useGetMockData(); // 훅에서 데이터 상태 구조분해할당
  ...
  return ...;
};
```

#### 2. 라이브러리 선택

차트 구현을 위한 라이브러리로 recharts를 사용하였습니다. chart.js(react-chartjs-2)를 사용하려 하였으나, js용 라이브러리를 react에서도 사용할 수 있게끔 만든 라이브러리인만큼 api 활용이 까다로웠고 직관적이지 않아 러닝커브가 높았습니다. 반면 recharts는 각 구성 요소가 컴포넌트로 잘 만들어져있고 각각의 옵션 적용에 대한 예시가 다양하게 있어 원하는 대로 차트를 구현할 수 있다는 점이 좋았습니다.

#### 3. 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요

x축의 dataKey를 data의 time으로 설정해주었습니다.

> Chart.tsx

```ts
// chart에서 사용할 data 설정
<ComposedChart width={1280} height={700} data={data ? data : undefined}>
  <XAxis
    dataKey='time' // dataKey를 time으로 설정
    ...
  />
  ...
</ComposedChart>
```

#### 4. 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요

recharts의 `ComposedChart` 컴포넌트를 사용하여 `Bar`, `Area` 컴포넌트가 함께 나오도록 만들어주었습니다.

> Chart.tsx

```ts
<ComposedChart ...>
  <Bar ... />
  <Area ... />
</ComposedChart>
```

#### 5. Area 그래프의 기준값은 `value_area` 값을 이용해주세요

Area의 dataKey를 `value_area`로 설정해주었습니다.

> Chart.tsx

```ts
<Area
  dataKey='value_area'
  ...
/>
```

#### 6. Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요

Bar의 dataKey를 `value_bar`로 설정해주었습니다.

> Chart.tsx

```ts
<Bar dataKey='value_bar' ...>
  ...
</Bar>
```

#### 7. 차트의 Y축에 대략적인 수치를 표현해주세요

2개의 y축을 만들어 왼쪽에는 `value_bar`의 수치를, 오른쪽에는 `value_area`의 수치를 표현하였습니다.

> Chart.tsx

```ts
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
```

### 호버 기능 구현

#### 1. 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

데이터의 id, value_bar, value_area, time이 표시되는 CustomToltip 컴포넌트를 만들고 Tooltip의 content로 설정해주었습니다.

> Chart.tsx

```ts
<Tooltip content={<CustomTooltip active={false} payload={[]} />} />

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
```

### 필터링 기능 구현

#### 1. 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요

Chart에서 FilteredId 상태를 만들어 주고, FilteringButton 컴포넌트에 props로 내려주었습니다.

> Chart.tsx

```ts
const Chart = () => {
  const [filteredId, setFilteredId] = useState('기본');
  ...
  return (
    ...
    <FilteringButton onFilter={setFilteredId} filteredId={filteredId} />
    ...
  )
}
```

필터링하는 버튼들을 보여주고, 클릭 시 현재 선택된 id를 상태로 저장하는 `FilteringButton` 컴포넌트를 만들었습니다.

> FilteringButton.tsx

```ts
const FilteringButton = ({ onFilter, filteredId }: {
  onFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredId: string;
}) => {
  ...
  return (
    <Wrapper>
      {FILTER_OPTIONS.map((location) => (
        <ButtonWrapper key={location} $iscurrentOption={isCurrentOption(location)}>
          <Button
            onClick={() => onFilter(location)} // 클릭 시 현재 지역값을 filteredId로 저장
            $iscurrentOption={isCurrentOption(location)}
          >
            {location}
          </Button>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
};
```

#### 2. 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요

`Bar`컴포넌트에서 `Cell`컴포넌트를 두어 id가 filteredId와 같은 데이터는 다른 색으로 표현되게 만들어주었습니다.

> Chart.tsx

```ts
<Bar ...>
  {data?.map((entry, index) => (
    <Cell
      key={index}
      cursor='pointer'
      fill={entry.id === filteredId ? '#517deb' : '#95aeec'}
    />
  ))}
</Bar>
```

#### 4. 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

`Bar` 컴포넌트에 onClick 이벤트를 할당하여 클릭 시 filtereId를 변경하도록 하였습니다. 이미 `filterId`에 따른 색 변경 로직이 있기 때문에 단순히 bar를 클릭하여 상태만 변경해줘도 기존 로직이 작동합니다.

```ts
const handleBarClick = (entry: prcessedData) => {
  setFilteredId(entry.id);
};

<Bar dataKey='value_bar' isAnimationActive={false} onClick={handleBarClick}>
  {data?.map((entry, index) => (
    <Cell
      key={index}
      cursor='pointer'
      fill={entry.id === filteredId ? '#517deb' : '#95aeec'}
    />
  ))}
</Bar>
```
