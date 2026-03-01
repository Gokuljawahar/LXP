export const watchTimeToSeconds = (watchTime) => {
  if (!watchTime || typeof watchTime !== "string") {
    return 0;
  }

  const [hours = 0, minutes = 0, seconds = 0] = watchTime
    .split(":")
    .map((value) => Number(value));

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    Number.isNaN(seconds)
  ) {
    return 0;
  }

  return hours * 3600 + minutes * 60 + seconds;
};
