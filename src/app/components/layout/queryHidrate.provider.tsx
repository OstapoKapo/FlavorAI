'use client'
import { DehydratedState, HydrationBoundary } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

interface ReactQueryHydrateProps {
  dehydratedState: DehydratedState;
  children: ReactNode;
}

export const ReactQueryHydrate: React.FC<ReactQueryHydrateProps> = ({
  dehydratedState,
  children,
}) => {
  return <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>;
};
