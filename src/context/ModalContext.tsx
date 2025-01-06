"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TypeModalContext = {
  isOpenCreateForm: boolean;
  setIsOpenCreateForm: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<TypeModalContext>({
  isOpenCreateForm: false,
  setIsOpenCreateForm: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpenCreateForm, setIsOpenCreateForm] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ isOpenCreateForm, setIsOpenCreateForm }}>
      {children}
    </ModalContext.Provider>
  );
};
