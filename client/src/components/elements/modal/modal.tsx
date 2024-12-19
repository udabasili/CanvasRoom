import clsx from 'clsx';
import { ReactNode } from 'react';

type ModalProps = {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  footer?: ReactNode;
};

export const Modal = ({ show, onClose, title, children }: ModalProps) => {
  const showHideClassName = show ? 'flex' : 'hidden';
  return (
    <div
      id="crud-modal"
      aria-hidden="true"
      className={clsx(
        'fixed inset-x-0 top-0 z-50 size-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/70 md:inset-0',
        showHideClassName,
      )}
    >
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow ">
          <div className="flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5">
            <h3 className="text-lg font-bold capitalize text-gray-900">
              {title}
            </h3>
            <button
              type="button"
              className="ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
              onClick={onClose}
            >
              <svg
                className="size-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};
