import { useState, type FormEvent } from "react";
import { newMapService } from "@app/services";

type Props = {
  getMap: () => Promise<void>;
};

export function CreateMap({ getMap }: Props) {
  const [form, setForm] = useState({
    row: 0,
    col: 0,
  });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await newMapService.generateMap(form.row, form.col);

    getMap();
  }

  return (
    <form onSubmit={submit}>
      <div className="form-container">
        <h1>Novo Jogo</h1>

        <div className="form-item">
        <label className="form-label"htmlFor="row-number">
        Total de linhas:
        </label>
        <input
          type="number"
          onChange={(e) => setForm({ ...form, row: Number(e.target.value) })}
        />
      </div>

      <div className="form-item">
        <label className="form-label" htmlFor="col-number">
        Total de colunas:
        </label>
        <input
          id="col-number"
          type="number"
          onChange={(e) => setForm({ ...form, col: Number(e.target.value) })}
        />
  
      </div>
  
      <button className="form-item" type="submit">Gerar mapa</button>
      </div>
    </form>
  );
}
