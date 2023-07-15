import styled from "styled-components";
import { useTheme } from "./context/ThemeContext";
import Header from "./components/Header";
import Button from "./components/Button";
import Trending from "./components/Trending";
import { useState } from "react";
import Random from "./components/Random";
import { useGlobal } from "./context/Global";
import Search from "./components/Search";
import Favourites from "./components/Favourites";

const App = () => {
  const { randomGiff } = useGlobal();

  const theme = useTheme();

  // State
  const [rendered, setRendered] = useState("trending");

  const content = () => {
    switch (rendered) {
      case "trending":
        return <Trending />;

      case "liked":
        return <Favourites rendered={rendered} />;

      case "random":
        return <Random />;

      case "search":
        return <Search />;

      default:
        return <Trending />;
    }
  };

  return (
    <AppStyled theme={theme}>
      <Header setRendered={setRendered} />
      <div className="fetch-btns">
        <Button
          name={"Liked"}
          icon={<i className="fa-solid fa-heart"></i>}
          onClick={() => {
            setRendered("liked");
          }}
        />

        <Button
          name={"Trending Gifs"}
          icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          onClick={() => {
            setRendered("trending");
          }}
        />

        <Button
          name={"Random Gif"}
          icon={<i className="fa-solid fa-shuffle"></i>}
          onClick={() => {
            setRendered("random");
            randomGiff();
          }}
        />
      </div>
      <main>{content()}</main>
    </AppStyled>
  );
};

const AppStyled = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colorBg1};

  .fetch-btns {
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 4rem;
    margin-bottom: 2rem;
  }

  main {
    padding: 2rem 8rem;

    @media screen and (max-width: 1300px) {
      padding: 2rem 4rem;
    }
  }
`;

export default App;
