'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

const client = new QueryClient();

export const QueryClientProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
};