interface Props {
  weight: { id: number; date: string; value: number; note: string };
}

const WeightItem = ({ weight }: Props) => {
  return (
    <li className="group my-2 flex items-center justify-between rounded bg-slate-100 p-2 transition-colors hover:bg-slate-300">
      <div className="flex items-center">
        <div className="mr-4 text-sm text-slate-500">
          {new Date(weight.date).toLocaleDateString()}
        </div>

        <div className="flex items-end">
          <div className="text-4xl">{weight.value}</div>
          <div className="ml-1 text-lg">kg</div>
        </div>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100">
        <div>EDIT</div>
        <div>REMOVE</div>
      </div>
    </li>
  );
};

export default WeightItem;
