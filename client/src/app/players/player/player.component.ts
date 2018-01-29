import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  public player = {
    name: null,
    team: 'F2',
    history: [
      {
        date: '01-02-2017',
        changedAttribute: 'teamMove',
        oldValue: 'F3',
        newValue: 'F2'
      }
    ],
    avatar: null,
    dob: null,
    email: null,
  }

  public chartOptions = {
    maintainAspectRatio: false,
    scale: {
      ticks: {
        min: 0,
        max: 5,
        stepSize: 1,
      }
    }
  }

  public radarChartLabels:string[] = ['Aanvallen', 'Verdedigen', 'Scoren', 'Teamspel', 'Tactiek'];
 
  public radarChartData:any = [
    // {data: [3, 2, 2, 4, 1,], label: '2015'},
    {data: [3, 3, 2, 5, 2,], label: '2016'},
    {data: [4, 2, 4, 5, 3,], label: '2017'}
  ];
  public radarChartType:string = 'radar';
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }


  constructor(private readonly http: HttpClient) { }

  ngOnInit() {
    const avatar = this.http.get('https://randomuser.me/api/1.1/?randomapi').subscribe(data => {
      const anyData = (<any>data).results[0];
      this.player.avatar = anyData.picture.large;
      this.player.name = `${anyData.name.first} ${anyData.name.last}`;
      this.player.dob = anyData.dob;
      this.player.email = anyData.email;
    });
  }
}
