import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import type { WeightType } from '../models/WeightData';
import DeleteWeightModal from './AddWeight/DeleteWeightModal';
import NoWeights from './NoWeights';
import WeightItem from './WeightItem';

interface Props {
  data: WeightType[];
}

const WeightDataList = ({ data }: Props) => {
  const queryClient = useQueryClient();
  const [removeModalState, setRemoveModalState] = useState({
    visible: false,
    selectedId: 0,
  });
  const { isLoading, isError, error, mutate } = useMutation(
    (id: number) =>
      axios.delete('/api/weights', {
        data: {
          id: id,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['weights']);
        setRemoveModalVisible(false);
      },
      retry: 0,
    }
  );

  const setRemoveModalVisible = (isVisible: boolean) => {
    setRemoveModalState((modalState) => ({
      ...modalState,
      visible: isVisible,
    }));
  };

  const onDeleteWeightClick = (selectedId: number) => {
    setRemoveModalState({
      selectedId: selectedId,
      visible: true,
    });
  };

  if (data.length === 0) {
    return <NoWeights />;
  }

  return (
    <>
      <DeleteWeightModal
        isOpen={removeModalState.visible}
        setOpen={setRemoveModalVisible}
        onDeleteClick={() => mutate(removeModalState.selectedId)}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      <ul className='xs:mx-2 sm:mx-0 sm:w-[300px]'>
        {data.map((item, index) => (
          <WeightItem
            key={index}
            weight={item}
            onDeleteClick={onDeleteWeightClick}
          />
        ))}
      </ul>
    </>
  );
};

export default WeightDataList;
