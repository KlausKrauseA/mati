import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { BodyComponent } from './components/body/body.component'
const routes: Routes = [
  {
    path:"", component: HomeComponent
  },
  {
    path:"home", component: HomeComponent
  },
  {
    path:"about", component: AboutComponent
  },
  {
    path:"reportes", component: ReportesComponent
  },
  {
    path: 'body', component: BodyComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
