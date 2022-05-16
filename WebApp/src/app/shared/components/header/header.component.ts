import { Component, NgModule, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService, IUser } from '../../services';
import { UserPanelModule } from '../user-panel/user-panel.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';

import { Router } from '@angular/router';
import { DxMenuModule } from 'devextreme-angular';
@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: IUser | null = { email: '' };

  public menuData: any;

  userMenuItems = [{
    text: 'Profile',
    icon: 'user',
    onClick: () => {
      this.router.navigate(['/profile']);
    }
  },
  {
    text: 'Logout',
    icon: 'runner',
    onClick: () => {
      this.authService.logOut();
    }
  }];

  constructor(private authService: AuthService, private router: Router) { 
    this.menuData = [
      { id: 1, name: 'Home'},
      { id: 2, name: 'Who we are'},
      { id: 3, name: 'Our mission'},
      { id: 4, name: 'How to apply'},
      { id: 5, name: 'Projects'},
    ];
  }

  ngOnInit() {
    this.authService.getUser().then((e) => this.user = e.data);
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  public menu_onItemClick(e: any) {
    let url = '';
    switch(e.itemData.id) {
      case 1:
        url = '/home';
        break;
      case 2:
        url = '/who-we-are';
        break;
      case 3:
        url = '/mission';
        break;
      case 4:
        url = '/apply';
        break;
      case 5:
        url = '/projects';
        break;
    }
    this.router.navigate([url]);
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    UserPanelModule,
    DxToolbarModule,
    DxMenuModule
  ],
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
})
export class HeaderModule { }
