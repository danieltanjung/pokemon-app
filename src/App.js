import "./App.scss";
import React, { useState } from "react";
import StartScreen from "./components/StartScreen/StartScreen";
import PokemonList from "./components/PokemonList/PokemonList";
import LoadingOverlay from "./components/LoadingOverlay/LoadingOverlay";
import PokemonListContextProvider, {
  usePokemonListFetch,
} from "./contexts/PokemonListContext";
import ArchiveContextProvider from "./contexts/ArchiveContext";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [showPokemonList, setShowPokemonList] = useState(false);
  const [fade, setFade] = useState(false);
  const [loading, error] = usePokemonListFetch();

  function startApp() {
    setFade(true);
    setTimeout(() => {
      setShowStartScreen(false);
      setShowPokemonList(true);
    }, 250);
  }

  return (
    <PokemonListContextProvider>
      <ArchiveContextProvider>
        <div className="App">
          <picture id="background">
            <source srcSet="/images/background.webp" type="image/webp" />
            <img src="/images/background.jpg" alt="background" loading="lazy" />
          </picture>
          {error && <ErrorPage error={error} />}
          {showStartScreen && <StartScreen startApp={startApp} />}
          {fade && <div id="fade-animation"></div>}
          {!showStartScreen && loading && (
            <LoadingOverlay animation="grow" variant="light" />
          )}
          {!showStartScreen && error && (
            <p style={{ backgroundColor: "white" }}>
              Something's wrong. Please try to refresh the page.
            </p>
          )}
          {!showStartScreen && showPokemonList && <PokemonList />}
        </div>
      </ArchiveContextProvider>
    </PokemonListContextProvider>
  );
}

export default App;
