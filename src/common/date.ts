export function padDatePart(part: number): string {
  return part.toString().padStart(2, '0');
}

export function usDate(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'numeric',
    day: 'numeric'
  });
}

export function usTime(date: Date): string {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    hour12: true,
    minute: 'numeric'
  });
}
