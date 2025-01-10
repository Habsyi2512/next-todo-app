"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TypeModalContext = {
  isOpenCreateForm: boolean;
  isOpenDeleteModal: boolean;
  setIsOpenCreateForm: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<TypeModalContext>({
  isOpenCreateForm: false,
  setIsOpenCreateForm: () => {},
  isOpenDeleteModal: false,
  setIsOpenDeleteModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{
        isOpenCreateForm,
        setIsOpenCreateForm,
        isOpenDeleteModal,
        setIsOpenDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
