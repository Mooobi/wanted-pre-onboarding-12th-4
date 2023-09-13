import styled from 'styled-components';
import Chart from '../components/Chart';

const Home = () => {
  return (
    <Wrapper>
      <Chart />
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.main`
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
