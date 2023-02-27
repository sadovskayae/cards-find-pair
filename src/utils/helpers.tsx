export const shuffle = (arr: string[]) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
};

export const cardContainsClass = (node: HTMLElement, className: string) => {
  return node?.parentElement?.parentElement?.className?.includes(className);
};
