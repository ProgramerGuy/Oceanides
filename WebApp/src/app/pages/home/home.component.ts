import { Component } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {

  public dsPlastics: any;
  public selectedPlasticItem: any;

  constructor(private mainService: MainService) {
    this.getPlastics();
    this.getGraphInfo();
    this.selectedPlasticItem = null;
  }

  public getPlastics() {
    this.mainService.getPlasticsInfo().subscribe( (res: any) => {
      this.dsPlastics = res;
      console.log(res);
    })
  }

  public getGraphInfo() {
    this.mainService.getGraphInfo().subscribe( (res: any) => {
      console.log(res);
    })
  }

  public platics_onItemClick(e: any): void {
    this.selectedPlasticItem = e.itemData;
  }
}
