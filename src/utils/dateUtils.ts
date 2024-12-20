import { format, parse } from 'date-fns';

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatDateForInput(date: string): string {
  return format(new Date(date), 'yyyy-MM-dd');
}

export function formatTimeForInput(date: string): string {
  return format(new Date(date), 'HH:mm');
}

export function combineDateAndTime(date: string, time: string): string {
  const dateObj = new Date(`${date}T${time}`);
  return dateObj.toISOString();
}