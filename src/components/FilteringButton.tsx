import styled from 'styled-components';
import { FILTER_OPTIONS } from '../constants/constants';

const FilteringButton = ({
  onFilter,
  filteredId,
}: {
  onFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredId: string;
}) => {
  const isCurrentOption = (location: string) => {
    return location === filteredId;
  };

  return (
    <Wrapper>
      {FILTER_OPTIONS.map((location) => (
        <ButtonWrapper key={location} $iscurrentOption={isCurrentOption(location)}>
          <Button onClick={() => onFilter(location)} $iscurrentOption={isCurrentOption(location)}>
            {location}
          </Button>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
};

export default FilteringButton;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div.attrs<{ $iscurrentOption: boolean }>(({ $iscurrentOption }) => ({
  $iscurrentOption: $iscurrentOption,
}))`
  button:hover {
    outline: 2px solid ${(props) => (props.$iscurrentOption ? '#4785ff' : 'none')};
    background: #cccccc;
    color: ${(props) => (props.$iscurrentOption ? '#4785ff' : '#474747')};
  }
  button:active {
    outline: 2px solid ${(props) => (props.$iscurrentOption ? '#226cff' : 'none')};
    background: #bbbbbb;
    color: ${(props) => (props.$iscurrentOption ? '#226cff' : '#474747')};
  }
`;

const Button = styled.button.attrs<{ $iscurrentOption: boolean }>(({ $iscurrentOption }) => ({
  $iscurrentOption: $iscurrentOption,
}))`
  outline: 2px solid ${(props) => (props.$iscurrentOption ? '#4080ff' : 'none')};
  background: #eeeeee;
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 0.5rem;
  color: ${(props) => (props.$iscurrentOption ? '#4080ff' : '#747474')};
`;
