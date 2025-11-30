export const getElapsedTimeInSeconds = (startTime: number) => {
  return Math.round((Date.now() - startTime) / 1000);
};

export const getRemainingTimeInSeconds = (
  startTime: number,
  duration: number
) => {
  const t = Math.round((duration - Date.now() + startTime) / 1000);
  return t > 0 ? t : 0;
};
