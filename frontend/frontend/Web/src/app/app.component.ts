import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData('/api/simulador/puntualidad');
  }

  fetchData(url: string): void {
    this.dataService.getData(url).subscribe((response) => {
      this.data = response;
      console.log(this.data);
    });
  }
}

