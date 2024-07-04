import { OnInit, Component } from '@angular/core';
import * as EventEmitter from 'events';
const axios = require('axios');

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit{

  fallas: number=0;
  normales: number=0;
  mediciones: any = [];

  pieChartOptions = {}
  barChartOptions = {}

  async ngOnInit(){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://localhost:7039/',
      headers: { }
    };

    await axios.request(config)
    .then((response: { data: any; }) => {
      this.mediciones = response.data;

      this.fallas = this.mediciones.filter((x: { Estado: boolean; }) => x.Estado == false).length
      this.normales = this.mediciones.filter((x: { Estado: boolean; }) => x.Estado == true).length

      this.pieChart()
      this.barChart()

    })
    .catch((error: any) => {
      console.log(error);
    });

  }

  formatData(){
    let arr = this.mediciones;
    arr.forEach((element: any) => {
      delete(element['Id'])
      delete(element['Estado'])
      delete(element['Fecha'])
      delete(element['Voltaje'])
      delete(element['Amperaje'])
      element["label"] = element["NombreEstacion"]
      element["y"] = element["Potencia"]
      delete(element["NombreEstacion"])
      delete(element["Potencia"])
    });

    const result = [...arr.reduce((r: { get: (arg0: any) => any; set: (arg0: any, arg1: any) => any; }, o: { label: any; y: string | number; }) => {
      const key = o.label ;
      const item = r.get(key) || Object.assign({}, o, {
        y: 0
      });

      let potencia = +o.y / 1000000
      item.y += potencia;

      return r.set(key, item);
    }, new Map).values()];

    return result;

  }

  barChart(){

    this.barChartOptions = {
      animationEnabled: true,
      title:{
        text: "Potencia x Estación (MW)"
      },
      axisY: {
        includeZero: true,
        suffix: "MW"
      },
      data: [{
        type: "bar",
        indexLabel: "{y}",
        yValueFormatString: "#,###MW",
       dataPoints: this.formatData()
      }]
    }
  }

  pieChart(){
    this.pieChartOptions = {
      animationEnabled: true,
      title: {
      text: "Distribución de Mediciones"
      },
      data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##",
        dataPoints: [{ y: this.normales, name: "Normales" }, { y: this.fallas, name: "Fallas" }]
      }]

    }
  }

}
