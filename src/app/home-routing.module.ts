import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("../app/modules/homepage/homepage.module").then(
        m => m.HomepageModule
      )
  },
  {
    path: "category",
    loadChildren: () =>
      import("../app/modules/homepage/homepage.module").then(
        m => m.HomepageModule
      )
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
