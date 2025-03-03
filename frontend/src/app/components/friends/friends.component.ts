import { Component } from '@angular/core';
import {FriendCardComponent} from './friend-card/friend-card.component';
import { FriendshipService } from '../../services/friendship.service';
import { FriendshipResponse } from '../../models/friendship/friendship-response.dto';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    FriendCardComponent
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent {

    friends:FriendshipResponse[]=[];
  constructor(private friendshipService:FriendshipService)
  {

  }
  ngOnInit():void{


    this.getFriends(4);
  }
  getFriends(userId:number):void{
    this.friendshipService.getAllFriends(userId).subscribe((data:FriendshipResponse[])=>{

      this.friends=data;
      console.log(data);
    })
  }


  handleMessage() {
    console.log('handled!!')
  }
}
