import {UserInfoResponse} from '../models/user/user-info-response.dto';

export const AGORA_APP_ID = '153a08fbab8b402c884fe3327fb8e16c';

let _owner = null;

export function setOwner(owner: UserInfoResponse) {
  _owner = owner;
  sessionStorage.setItem("userInfo", JSON.stringify(owner));
}

export function getOwner(): UserInfoResponse {
  if (_owner) return _owner;
  const stored = sessionStorage.getItem("userInfo");
  if (stored) {
    _owner = JSON.parse(stored);
    return _owner;
  }
  return null;
}

export function clearOwner(): void {
  _owner = null;
  sessionStorage.removeItem("userInfo");
}

export function ownerExists(): boolean {
  return !!sessionStorage.getItem("userInfo");
}
