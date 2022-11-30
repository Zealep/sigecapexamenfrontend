import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ItemMenu } from '../model/dto/item-menu';
import { MenuService } from '../service/menu.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


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




  constructor(private observer: BreakpointObserver, private router: Router, private menuService: MenuService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getMenus('22060017', '20210009')
      .subscribe(x => {
        this.items = x;
      })
  }

  selectedItem(event: any) {
    console.log('event', event)
    //this.router.navigate(['/pages'+event.link]);
  }


}

