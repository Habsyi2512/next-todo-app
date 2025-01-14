"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export type TypeModalContext = {
  isOpenCreateForm: boolean;
  isOpenDeleteModal: boolean;
  isOpenEditForm: boolean;
  setIsOpenEditForm: Dispatch<SetStateAction<boolean>>;
  setIsOpenCreateForm: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<TypeModalContext>({
  isOpenCreateForm: false,
  isOpenDeleteModal: false,
  isOpenEditForm: false,
  setIsOpenEditForm: () => {},
  setIsOpenCreateForm: () => {},
  setIsOpenDeleteModal: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
  return (
    <ModalContext.Provider
      value={{
        isOpenCreateForm,
        isOpenDeleteModal,
        isOpenEditForm,
        setIsOpenEditForm,
        setIsOpenCreateForm,
        setIsOpenDeleteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContatext must be used within a ModalProvider");
  }
  return context;
};
