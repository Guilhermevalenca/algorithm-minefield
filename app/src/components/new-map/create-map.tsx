import { useState, type FormEvent } from "react";
import { newMapService } from "../../app/services";

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
  );
}
