import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class BoardDataService {
  /////////////////////////////////////////////////////
  // Subjects
  /////////////////////////////////////////////////////

  private isSidebarMinimized = new BehaviorSubject<boolean>(false);
  private isPadding = new BehaviorSubject<boolean>(true);


  /////////////////////////////////////////////////////
  // Observables
  // ///////////////////////////////////////////////////

  isSidebarMinimized$: Observable<boolean> = this.isSidebarMinimized.asObservable();
  isPadding$: Observable<boolean> = this.isPadding.asObservable();


  /////////////////////////////////////////////////////
  //  Methods
  ////////////////////////////////////////////////////

  // Sidebar Minimization State
  minimizeSidebar() {this.isSidebarMinimized.next(true);}
  maximizeSidebar() {this.isSidebarMinimized.next(false);}

  // Main Content Padding State
  addMainContentPadding() {this.isPadding.next(true);}
  removeMainContentPadding() {this.isPadding.next(false);}
}
