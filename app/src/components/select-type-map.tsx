import { TypeStartMap } from "../app/enums";

type Props = {
  select: (params: number) => void;
};

export function SelectTypeMap({ select }: Props) {
  return (
    <>
      <form>
        <select onChange={(e) => select(Number(e.target.value))}>
          <option value={TypeStartMap.NEW}>Novo</option>
          <option value={TypeStartMap.CLASSIC}>Classico</option>
        </select>
      </form>
    </>
  );
}
