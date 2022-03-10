import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

type Props = {
  isOpen?: boolean,
  onClose?: () => void,
  children: any;
  className?: string,
  isStatic?: boolean,
};

const Modal = ({ isOpen = true, onClose = () => {}, className = '', children, isStatic = false }: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className={`fixed z-50 inset-0 animate-fade-in`}
      static={isStatic}
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black animate-fade-in-modal"/>

        <div className={`relative bg-white rounded w-full max-w-[480px] mx-auto px-6 pb-6 pt-12 ${className}`}>
          {!isStatic && (
            <div className="absolute top-3 right-3 flex place-items-center">
              <button onClick={onClose} tabIndex={-1}>
                <XIcon className="h-6 w-6 mx-auto"/>
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
