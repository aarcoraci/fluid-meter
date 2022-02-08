const clamp = (number: number, min: number, max: number) => {
  return Math.min(Math.max(number, min), max);
};

const random = (min: number, max: number) => {
  const delta = max - min;
  return max === min ? min : Math.random() * delta + min;
};

export { clamp, random };
