import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  children: ReactNode;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { children },
  ref
) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
    close() {
      dialog.current?.close();
    },
  }));

  const portalRoot = document.getElementById('modal');

  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    portalRoot
  );
});

export default Modal;