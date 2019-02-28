import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TeamsProvider } from '../../providers/teams/teams';
import { Chart } from 'chart.js';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('denPieCanvas') denPieCanvas;
  
  denChart: any; 

  teamCrimes: any = [];
  categoryId: any = [];
  
  drugs: number = 0;
  dui: number = 0;
  alcohol: number = 0;
  assault: number = 0;
  theft: number = 0;
  domestic: number = 0;
  sex: number = 0;
  license: number = 0;
  gun: number = 0;
  other: number = 0;

  constructor(public navCtrl: NavController, private teamsProvider: TeamsProvider) {
    }


  ionViewDidLoad(){
    this.getTeamCrimes();
  }


  drawDenChart(){

    this.denChart = new Chart(this.denPieCanvas.nativeElement, {
    
      type: 'pie',
      data: {
          labels: ["Drugs", "DUI", "Alcohol", "Assault/Battery", "Theft/Burglary", "Domestic violence", "Sex", "License/Traffic", "Gun", "Other"],
          datasets: [{
              label: '# of Votes',
              data: [this.drugs, this.dui, this.alcohol, this.assault, this.theft, this.domestic, this.sex, this.license, this.gun, this.other],
              backgroundColor: [
                'rgba(244, 0, 4, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(33, 249, 0, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(157, 255, 0, 0.5)',
                'rgba(255, 91, 15, 0.5)',
                'rgba(234, 0, 218, 0.5)',
                'rgba(117, 67, 45, 0.5)',
                'rgba(0, 0, 0, 0.5)',
                'rgba(168, 168, 168, 0.5)',
                'rgba(172, 88, 36, 0.5)'
              ],
              hoverBackgroundColor: [
                  "#F40004",
                  "#36A2EB",
                  "#21F900",
                  "#4BC0C0",
                  "#9DFF00",
                  "#FF5B0F",
                  "#EA00DA",
                  "#75432D",
                  "#000000",
                  "#A8A8A8",
                  "#AC5824"
              ]
          }]
      },
      options: {
        responsive: true,
        aspectRatio: .5,
      }

  });
}  

getTeamCrimes(){
  this.teamsProvider.getTeamArrests().then(data => {
    this.teamCrimes = data;

    this.teamCrimes.forEach(element => {
      this.categoryId.push(element.overall_category_id);
    });

    for(let i = 0; i < this.categoryId.length; i++){
        
      if(this.categoryId[i] == "1"){
        this.dui++;
      }

      if(this.categoryId[i] == "2"){
        this.domestic++;
      }

      if(this.categoryId[i] == "3"){
        this.drugs++;
      }
    
      if(this.categoryId[i] == "4"){
        this.assault++;
      }

      if(this.categoryId[i] == "6"){
        this.gun++;
      }

      if(this.categoryId[i] == "7" || this.categoryId[i] == "5"){
        this.alcohol++;
      }
      
      if(this.categoryId[i] == "8"){
        this.license++;
      }

      if(this.categoryId[i] == "9"){
        this.theft++;
      }

      if(this.categoryId[i] == "14"){
        this.sex++;
      }
      
      if(this.categoryId[i] == "27"){
        this.other++;
      }

    }

     this.drawDenChart();

  },err => {
    console.log(err);
  });

  
}


}
