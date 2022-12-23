import { PlusSmallIcon } from "@heroicons/react/20/solid";

interface Props {
  className?: string;
}

const AddWeightButton = ({ className = "" }: Props) => (
  <a
    href="#"
    className={`mr-2 hidden items-center justify-center rounded-md border border-transparent bg-green-600 px-5 py-1 text-base text-white hover:bg-green-800 sm:flex ${className}`}
  >
    <PlusSmallIcon className="h-6 w-6" />
    <span>Add Weight</span>
  </a>
);

export default AddWeightButton;
