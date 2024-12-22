export const getDateKeys = (arr: string[]) => {
  const newDatekey: any = [];

  arr.map((val) =>
    newDatekey.push({ dataKey: val, name: val, strokeWidth: 2 })
  );

  return newDatekey;
};
