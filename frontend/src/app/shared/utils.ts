import {UserInfoResponse} from '../models/user/user-info-response.dto';

export function formatDate(isoString: string): string {
  if (!isoString) isoString = new Date().toISOString();
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB');
}

export function formatTime(isoString: string): string {
  if (!isoString) isoString = new Date().toISOString();
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(isoString: string): string {
    return `${formatDate(isoString)} ${formatTime(isoString)}`;
}

export function getProfilePicture(user: UserInfoResponse) {
  return localStorage.getItem(String(user.userId));
}
