const createColor =
  (r: number, g: number, b: number) =>
  (opacity = 1) =>
    `rgba(${r} ${g} ${b} / ${opacity})`;

export const dark = createColor(35, 39, 45);
export const light = createColor(239, 239, 239);
