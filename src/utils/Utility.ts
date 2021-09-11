export const contains = (text: string, query: string): boolean => {
  if (text.toString().toLowerCase().includes(query.toString().toLowerCase())) {
    return true;
  }
  return false;
};
