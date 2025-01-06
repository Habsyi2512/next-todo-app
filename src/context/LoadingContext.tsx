"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TypeLoadingContext = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadingContext = createContext<TypeLoadingContext>({
  loading: false,
  setLoading: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
