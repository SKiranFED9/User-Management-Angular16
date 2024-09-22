import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { User } from '../user.model';
import { environment } from 'src/app/environments/environment.developement';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private readonly baseUrl = environment.apiUrl + "/tailWindUsers";
  private messageSource = new BehaviorSubject('Default message');  
  getUserData = {};
  currentMessage = this.messageSource.asObservable();
  constructor( private http: HttpClient ) { }

  changeMessage(message : string) {
    this.messageSource.next(message);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(delay(300));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user).pipe(delay(300));
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/${id}`, user)
      .pipe(delay(300));
  }
/* eslint-disable @typescript-eslint/no-explicit-any */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(delay(300));
  }
  

  // getAllUsers(){
  //   return this.http.get<UmUsers[]>('http://localhost:3000/tailWindUsers');
  // }

  // createUsers(data: UmUsers) {
  //   return this.http.post(`http://localhost:3000/tailWindUsers`, data);
  // }

  // editUsers(id: number) {
  //   return this.http.get<UmUsers>(`http://localhost:3000/tailWindUsers/${id}`);
  // }

  // updateUsers(data: UmUsers){
  //   return this.http.put<UmUsers>(`http://localhost:3000/tailWindUsers/${data.id}`, data);
  // }

  // deleteUsers(id: number) {
  //   return this.http.delete<UmUsers>(`http://localhost:3000/tailWindUsers/${id}`);
  // }

}
