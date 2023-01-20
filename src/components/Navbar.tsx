import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import LoadingSpinner from './LoadingSpinner';
import { useAtom } from 'jotai';
import UserDetailsAtom from '../atoms/UserDetailsAtom';
import Image from 'next/image';

interface Props {
  avatarUrl?: string;
  signOutCallback: () => void;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ avatarUrl, signOutCallback }: Props) => {
  const [userData, _] = useAtom(UserDetailsAtom);

  const greeting = () => {
    const currentDate = new Date();
    const hour = currentDate.getHours();

    let format = '';
    if (hour >= 6 && hour < 11) {
      format = 'Good morning';
    } else if (hour >= 11 && hour < 16) {
      format = 'Good day';
    } else if (hour >= 16 && hour <= 18) {
      format = 'Good evening';
    } else {
      format = 'Good night';
    }

    return `${format}, ${userData.firstName}.`;
  };

  return (
    <Disclosure as='nav' className='bg-gray-800'>
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 justify-between'>
            <div className='flex flex-1 items-center sm:items-stretch sm:justify-start'>
              <div className='flex flex-shrink-0 items-center self-center'>
                <Image
                  className='block h-8 w-auto lg:hidden'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                  width={32}
                  height={32}
                />
                <Image
                  className='hidden h-8 w-auto lg:block'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                  width={32}
                  height={32}
                />

                <div className='ml-2 text-white'>{greeting()}</div>
              </div>
            </div>

            {avatarUrl ? (
              <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                <button
                  type='button'
                  className='rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='sr-only'>Open user menu</span>
                      <Image
                        className='h-8 w-8 rounded-full'
                        src={avatarUrl}
                        alt=''
                        width={64}
                        height={64}
                      ></Image>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/profile'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href='/settings'
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={signOutCallback}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
