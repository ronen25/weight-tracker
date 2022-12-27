import { PlusSmallIcon } from "@heroicons/react/20/solid";

interface Props {
  onClick: () => void;
}

const AddWeightButton = ({ onClick }: Props) => (
  <a
    href="#"
    className="flex items-center justify-center rounded-md border border-transparent bg-green-600 py-0.5 text-base text-white hover:bg-green-800"
    onClick={onClick}
  >
    <PlusSmallIcon className="m-0 h-8 w-8 p-0" />
    <span>Add Weight</span>
  </a>
);

export default AddWeightButton;
