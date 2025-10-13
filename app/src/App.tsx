import "./App.css";
import { RenderMap, CreateMap } from "./components";
import { useMap } from "./hooks";

function App() {
  const { map, refresh, updateElement } = useMap();

  return (
    <>
      <CreateMap getMap={() => refresh()} />
      {map && <RenderMap map={map} updateElement={updateElement} />}
    </>
  );
}

export default App;
