export const formatDuration = (time: number) => {
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor((time - hours * 60 * 60) / 60);
  const seconds = Math.floor((time - hours * 60 * 60 - minutes * 60) % 60);
  let timeString = "";
  if (hours > 0) {
    timeString += ` ${hours} hr `;
  }
  if (minutes > 0) {
    timeString += ` ${minutes} min `;
  }
  // if (seconds > 0) {
  //   timeString += ` ${seconds} sec `;
  // }
  return timeString;
};
