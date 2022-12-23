import { PencilIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
  weight: { id: number; date: string; value: number; note: string };
}

const WeightItem = ({ weight }: Props) => {
  return (
    <li className="group my-1 flex items-center justify-between rounded p-2 py-1 transition-colors hover:bg-slate-200">
      <div className="flex items-center">
        <div className="mr-4 text-sm text-slate-500">
          {new Date(weight.date).toLocaleDateString()}
        </div>

        <div className="flex items-end">
          <div className="text-4xl">{weight.value}</div>
          <div className="ml-1 text-lg">kg</div>
        </div>
      </div>

      <div className="ml-10 flex opacity-0 group-hover:opacity-100">
        <div className="cursor-pointer rounded p-1 transition-colors hover:bg-slate-400">
          <PencilIcon className="h-6 w-6" />
        </div>

        <div className="ml-2 cursor-pointer rounded p-1 transition-colors hover:bg-slate-400">
          <XMarkIcon className="h-6 w-6" />
        </div>
      </div>
    </li>
  );
};

export default WeightItem;
