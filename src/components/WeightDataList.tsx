import type { WeightType } from "../models/WeightData";
import NoWeights from "./NoWeights";
import WeightItem from "./WeightItem";

interface Props {
  data: WeightType[];
}

const WeightDataList = ({ data }: Props) => {
  if (data.length === 0) {
    return <NoWeights />;
  }

  return (
    <ul className="sm:w-4/5">
      {data.map((item, index) => (
        <WeightItem key={index} weight={item} />
      ))}
    </ul>
  );
};

export default WeightDataList;
