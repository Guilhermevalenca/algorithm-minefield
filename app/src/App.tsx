import { useState } from "react";
import "./App.css";
import { TypeStartMap } from "./app/enums";
import { NewMap, SelectTypeMap } from "./components/";
import { ClassicMap } from "./components/classic-map";

function App() {
  const [selected, setSelected] = useState<TypeStartMap>(TypeStartMap.NEW);

  function select(value: number) {
    if (value === TypeStartMap.NEW) {
      setSelected(TypeStartMap.NEW);
    } else if (value === TypeStartMap.CLASSIC) {
      setSelected(TypeStartMap.CLASSIC);
    }
  }
  return (
    <>
      <SelectTypeMap select={select} />
      {selected === TypeStartMap.CLASSIC ? <ClassicMap /> : <NewMap />}
    </>
  );
}

export default App;
