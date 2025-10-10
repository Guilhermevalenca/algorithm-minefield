import { useState, type FormEvent } from "react";
import "./App.css";
import { RenderMap } from "./components";
import { useFetchMap } from "./hooks";
import { mapService } from "./app/services";

function App() {
  const { map, refresh } = useFetchMap();
  const [form, setForm] = useState({
    row: 0,
    col: 0,
  });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await mapService.generateMap(form.row, form.col);

    refresh();
  }

  return (
    <>
      <form onSubmit={submit}>
        <label>
          Total de linhas:
          <input
            type="number"
            onChange={(e) => setForm({ ...form, row: Number(e.target.value) })}
          />
        </label>
        <label>
          Total de colunas:
          <input
            type="number"
            onChange={(e) => setForm({ ...form, col: Number(e.target.value) })}
          />
        </label>
        <button type="submit">Gerar mapa</button>
      </form>
      {map && <RenderMap map={map} refresh={refresh} />}
    </>
  );
}

export default App;
