import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { WeightType } from '../../models/WeightData';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import getErrorText from '../../lib/util/error';

interface Props {
  open: boolean;
  setOpen: any;
}

type Inputs = {
  date: Date;
  value: number;
  note: string;
};

const AddWeightModal = ({ open, setOpen }: Props) => {
  const cancelButtonRef = useRef(null);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const {
    isLoading: mutationIsLoading,
    isError,
    error,
    mutate,
  } = useMutation(
    (weightValue: WeightType) => axios.post('/api/weights', weightValue),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['weights']);
        setOpen(false);
        reset();
      },
      retry: 0,
    }
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const weight: WeightType = {
      date: new Date(data.date),
      value: data.value,
      note: data.note,
    };
    mutate(weight);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-10'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <form
            className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
            onSubmit={handleSubmit(onSubmit)}
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                      >
                        Add New Weight
                      </Dialog.Title>
                      <div className='mt-2'></div>
                    </div>
                  </div>

                  <div className='col-span-6 mb-3 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Date
                    </label>
                    <input
                      type='date'
                      autoComplete='given-name'
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.date ? 'bg-yellow-100' : ''
                      }`}
                      {...register('date', { required: true })}
                    />
                  </div>

                  <div className='col-span-6 mb-3 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Weight
                    </label>
                    <div className='mt-1 mb-3 flex rounded-md shadow-sm'>
                      <input
                        type='text'
                        className={`block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                          errors.value ? 'bg-yellow-100' : ''
                        }`}
                        placeholder='e.g. 54 kg'
                        {...register('value', {
                          required: true,
                          min: 1,
                          max: 130,
                          valueAsNumber: true,
                        })}
                      />
                      <span className='inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500'>
                        kg
                      </span>
                    </div>
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='first-name'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Note
                    </label>
                    <input
                      type='text'
                      autoComplete='given-name'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      {...register('note')}
                    />
                  </div>
                </div>
                <div className='justify-end bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6'>
                  {isError && (
                    <div className='max-h-8 overflow-auto text-xs text-red-600'>
                      {getErrorText(error)}
                    </div>
                  )}
                  {mutationIsLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <div className='xs:flex-col-reverse xs:flex sm:flex sm:flex-row-reverse'>
                      <button
                        type='submit'
                        className='mt-2 inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                      >
                        Add
                      </button>
                      <button
                        type='button'
                        className='mt-2 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddWeightModal;
