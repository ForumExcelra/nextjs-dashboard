// common/useRandom.ts
'use client';
import { useMemo } from 'react';
import { faker } from '@faker-js/faker';

export const useRandom = () => {
  const randomColor = useMemo(() => {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F0F0F0'];
    return () => colors[Math.floor(Math.random() * colors.length)];
  }, []);

  return {
    faker,
    randomColor,
  };
};
