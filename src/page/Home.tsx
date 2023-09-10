import useGetGraph from '../hook/useGetGraph';

const Home = () => {
  const { graphData } = useGetGraph();

  console.info(graphData);
  return <></>;
};

export default Home;
