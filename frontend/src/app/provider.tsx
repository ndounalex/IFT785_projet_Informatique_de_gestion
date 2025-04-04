"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface ProviderProps {
    children: ReactNode;
    session: Session|null;
}

export const Provider = ({ children, session }: ProviderProps) => {
    return(
    <SessionProvider session={session}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}</LocalizationProvider></SessionProvider>)
    ;
};