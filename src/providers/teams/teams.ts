import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the TeamsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TeamsProvider{
  
  
  urlTeamCrimes: string = 'https://nflarrest.com/api/v1/team/arrests/den';

  constructor(public http: HttpClient) {
    
  }

    
  getTeamArrests(){
    return new Promise((resolve, reject) => {
      this.http.get(this.urlTeamCrimes).subscribe(data => {
        resolve(data)
      },error => {
        reject("Error retrieving team arrests");
      });
    });
  }
}
