"use client";

import type React from "react";

import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { AuthProvider } from "./auth-provider";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <AuthProvider>{children}</AuthProvider>
      </PersistGate>
    </Provider>
  );
}
