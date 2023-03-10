import { XMarkIcon } from '@heroicons/react/20/solid';
import type { WeightType } from '../models/WeightData';

interface Props {
  weight: WeightType;
  onDeleteClick: (id: number) => void;
}

const WeightItem = ({ weight, onDeleteClick }: Props) => {
  return (
    <li className='group my-1 flex items-center justify-between rounded p-2 py-1 transition-colors hover:bg-slate-200'>
      <div className='flex items-center'>
        <div className='mr-4 text-xs text-slate-500'>
          {new Date(weight.date).toLocaleDateString()}
        </div>

        <div className='flex items-end'>
          <div className='text-md'>{weight.value}</div>
          <div className='ml-1 text-sm'>kg</div>
        </div>
      </div>

      <div className='ml-10 flex opacity-0 group-hover:opacity-100'>
        <div
          className='ml-1 cursor-pointer rounded p-1 transition-colors hover:bg-slate-400'
          onClick={() => onDeleteClick(weight.id)}
        >
          <XMarkIcon className='h-4 w-4' />
        </div>
      </div>
    </li>
  );
};

export default WeightItem;
