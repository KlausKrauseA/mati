
// src/app/components/body/body.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
/** https://material.angular.io/components/datepicker/overview */
/** @title Basic datepicker */


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent implements OnInit {
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Puedes inicializar algún dato aquí si es necesario
  }

  fetchData(endpoint: string): void {
    this.dataService.getData(endpoint).subscribe(
      (response) => {
        this.data = response;
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}





