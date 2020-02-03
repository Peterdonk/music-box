import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
import { TopCarouselComponent } from "./top-carousel/top-carousel.component";
import { PoliciesComponent } from "./policies/policies.component";
import { FavoriteInstrumentsComponent } from "./favorite-instruments/favorite-instruments.component";
import { InstrumentCategoriesComponent } from "./instrument-categories/instrument-categories.component";
import { LandingPageComponent } from "./landing-page.component";
import { FooterComponent } from "./footer/footer.component";

import { Routes, RouterModule } from "@angular/router";
import { InstrumentCategoriesModule } from "./instrument-categories/instrument-categories.module";

const routes: Routes = [
  {
    path: " ",
    component: LandingPageComponent
  },
  {
    path: "drummer",
    loadChildren: () =>
      import("./instrument-categories/instrument-categories.module").then(
        m => m.InstrumentCategoriesModule
      )
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InstrumentCategoriesModule
  ],
  exports: [RouterModule],
  declarations: [
    MainMenuComponent,
    SideMenuComponent,
    TopCarouselComponent,
    PoliciesComponent,
    FavoriteInstrumentsComponent,
    InstrumentCategoriesComponent,
    LandingPageComponent,
    FooterComponent
  ]
})
export class HomepageModule {}
