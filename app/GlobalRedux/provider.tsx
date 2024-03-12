"use client";
import { Provider, useSelector } from "react-redux";
import { Rootstate, store } from "./store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
