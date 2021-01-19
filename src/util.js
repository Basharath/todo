export function getFormattedDate(date) {
  const now = new Date(date);
  const arr = now.toString().split(' ');
  const dateString = arr[1] + ' ' + arr[2] + ', ' + arr[3];
  const dayString = arr[0];
  const timeString = now.toLocaleTimeString();

  return dateString + ' ' + dayString + ' ' + timeString;
}
