import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class DataService {
  private isSidebarMinimized = new BehaviorSubject<boolean>(false);
  private isPadding = new BehaviorSubject<boolean>(false);
  isSidebarMinimized$: Observable<boolean> = this.isSidebarMinimized.asObservable();
  isPadding$ = this.isPadding.asObservable();

  minimizeSidebar() {
    this.isSidebarMinimized.next(true);
  }

  maximizeSidebar() {
    this.isSidebarMinimized.next(false);
  }

  addMainContentPadding() {
    this.isPadding.next(true);
  }

  removeMainContentPadding() {
    this.isPadding.next(false);
  }
}
