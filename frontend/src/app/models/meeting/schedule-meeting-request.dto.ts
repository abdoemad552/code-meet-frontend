export interface ScheduleMeetingRequest {
  title: string;
  description: string;
  creatorId: number;
  startsAt: string,
  participants: string[]
}
