"use client";

import AppLayout from "../../components/layout/appLayout";

export default function PrivateLayout({ children }) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
