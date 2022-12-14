import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ItemMenu } from '../model/dto/item-menu';
import { MenuService } from '../service/menu.service';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  mobileQuery!: MediaQueryList;
  usuario!: string

  items: ItemMenu[] = []

  config = {

    paddingAtStart: true,
    classname: 'custom-sidenav',
    listBackgroundColor: '#13124B',
    fontColor: 'white',
    backgroundColor: '#13124B',
    selectedListFontColor: '#FF3E33',
    highlightOnSelect: true,
  };


  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private login: AuthenticationService, private menuService: MenuService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,

    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.usuario = sessionStorage.getItem('username')!;
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus(this.usuario)
      .subscribe(x => {
        this.items = x;
      })
  }

  selectedItem(event: any) {
    console.log('event', event)
    //this.router.navigate(['/pages'+event.link]);
  }
  salir() {
    this.login.logOut();
  }


}

