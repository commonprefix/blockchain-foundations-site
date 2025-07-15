export function padDatePart(part: number): string {
  return part.toString().padStart(2, '0');
}

export function euDate(date: Date): string {
  return date.toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric'
  });
}

export function euTime(date: Date): string {
  return date.toLocaleString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}
