"use client";
import { Provider, useSelector } from "react-redux";
import { Rootstate, store } from "./store";

export function Providers({ children }) {
  // const userAuthReducer = useSelector((state: Rootstate) => state.auth);
  // const { isAuthLoading } = userAuthReducer;

  return <Provider store={store}>{children}</Provider>;
}
