import { useEffect, useRef } from "react";

function Modal( { openModal, closeModal, children } ) {
    const ref = useRef();

    useEffect(() => {
      if (openModal) {
        ref.current?.showModal();
      } else {
        ref.current?.close();
      }
    }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
    > 
    <button onClick={closeModal}>
        Close
    </button>

      {children}
     
    </dialog>
  )
}

export default Modal;
