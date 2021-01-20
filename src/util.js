export function getFormattedDate(dateString) {
  const now = new Date(dateString);
  const date = now.getDate();
  const month = now.toLocaleString('en-us', { month: 'long' });
  const year = now.getFullYear();
  const time = now.toLocaleTimeString();

  return {
    short: `${date} ${month}, ${year}`,
    long: `${date} ${month}, ${year} ${time}`,
  };
}
