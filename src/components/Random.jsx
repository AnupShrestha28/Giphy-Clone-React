import styled from "styled-components";
import { useGlobal } from "../context/Global";
import { useTheme } from "../context/ThemeContext";
import GiffItem from "./GiffItem";
import Loader from "./Loader";

const Random = () => {
  const { random, loading } = useGlobal();

  const theme = useTheme();

  return (
    <RandomStyled theme={theme}>
      {loading ? <Loader /> : <GiffItem {...random} />}
    </RandomStyled>
  );
};

const RandomStyled = styled.article`
  padding: 2rem;
  background-color: ${(props) => props.theme.colorBg2};
  border-radius: 1rem;
  width: 50%;
  margin: 0 auto;
`;

export default Random;
