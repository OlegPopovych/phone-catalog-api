'use strict';
export const generateRandomArray = ({ size, to }: { size: number; to: number }) => {
  const uniqueValues = new Set<number>();

  while (uniqueValues.size < size) {
    uniqueValues.add(getRandomInt(to));
  }

  return Array.from(uniqueValues);
};
const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};
