import { Component } from '@angular/core';
import { MainService } from 'src/app/shared/services/main.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: [ './home.component.scss' ]
})

export class HomeComponent {
  constructor(private mainService: MainService) {
    this.getPlastics();
  }

  public getPlastics() {
    this.mainService.getPlasticsInfo().subscribe( (res: any) => {
      console.log(res);
    })
  }
}
