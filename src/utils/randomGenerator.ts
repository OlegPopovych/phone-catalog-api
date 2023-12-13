'use strict';

const getRandomInt = (to: number) => {
  return Math.floor(Math.random() * (to + 1));
};

export const generateRandomArray = ({size, to}: {size: number, to: number}) => {
  const randomArray = [];

  for (let i = 0; i < size; i++) {
    randomArray.push(getRandomInt(to));
  }

  return randomArray;
};
