import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { WeightType } from "../models/WeightData";
import LoadingSpinner from "./LoadingSpinner";
import NoWeights from "./NoWeights";
import WeightItem from "./WeightItem";

interface Props {
  data: WeightType[];
}

const WeightDataList = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const { isLoading, mutate: doDelete } = useMutation(
    (date: Date) => axios.delete("/api/weights", { data: date }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["weights"]);
      },
      retry: 0,
    }
  );
  if (data.length === 0) {
    return <NoWeights />;
  }

  const onDeleteClick = (date: Date) => {
    doDelete(date);
  };

  return (
    <ul className="xs:mx-2 sm:mx-0 sm:w-[300px]">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        data.map((item, index) => (
          <WeightItem key={index} weight={item} onDeleteClick={onDeleteClick} />
        ))
      )}
    </ul>
  );
};

export default WeightDataList;
