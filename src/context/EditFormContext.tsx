"use client";

import React, { createContext, Dispatch, SetStateAction } from "react";

export type TypeEditFormContext = {
  isOpenEditForm: boolean;
  dataEditForm: {
    id: number;
    title: string;
  } | null;
  setDataEditForm: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
    } | null>
  >;
  setIsOpenEditForm: Dispatch<SetStateAction<boolean>>;
};

export const EditFormContext = createContext<TypeEditFormContext>({
  isOpenEditForm: false,
  dataEditForm: { title: "", id: 0 },
  setDataEditForm: () => {},
  setIsOpenEditForm: () => {},
});

export default function EditFormProvider(children: React.ReactNode) {
  const [isOpenEditForm, setIsOpenEditForm] = React.useState<boolean>(false);
  const [dataEditForm, setDataEditForm] = React.useState<{
    id: number;
    title: string;
  } | null>(null);
  return (
    <EditFormContext
      value={{
        isOpenEditForm,
        dataEditForm,
        setDataEditForm,
        setIsOpenEditForm,
      }}
    >
      {children}
    </EditFormContext>
  );
}
