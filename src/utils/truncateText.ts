export const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return text;
  return text?.length > maxLength ? `${text?.slice(0, maxLength)}...` : text;
};
