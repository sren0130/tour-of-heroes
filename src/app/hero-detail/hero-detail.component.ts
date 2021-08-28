import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();   // if no such call, no output for HeroDetailComponent output
  }

  getHero(): void {
    // ------ The way to get parameter for snapshot!!
    // const id = Number(this.route.snapshot.paramMap.get('id'));

    let id: number;
    //   == Not sure how id1 works FK!!
    // const id1 = this.route.params.subscribe(params => {
    const id1 = this.route.params.subscribe(params => {
      id = +params['id'] || 0;    // id is used in anchor routerLink="/detail/:id"

      // this service must be in this block!!
      this.heroService.getHero(id).subscribe(hero => this.hero = hero);
    })
  };

  goBack() {
    this.location.back();
  }
}
