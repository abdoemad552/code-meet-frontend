export interface ScheduledMeeting{
    title:String,
     description:String,
  creatorId:number,
startTime:Date,
   participants: Set<String>
}