export const CURRENCY = "LPS";

export const formatterCURRENCY = (value) => {
  const result = `L.${(Math.round(value * 100) / 100).toFixed(2)}`;
  return result;
};
