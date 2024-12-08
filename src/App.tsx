import Header from "./componenets/Header.tsx";
import NewOpinion from "./componenets/NewOpinion.tsx";
import Opinions from "./componenets/Opinions.tsx";
import OpinionsContextProvider from "./store/OpinionContext.tsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <OpinionsContextProvider>
          <NewOpinion />
          <Opinions />
        </OpinionsContextProvider>
      </main>
    </>
  );
}

export default App;
