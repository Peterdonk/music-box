import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HomeRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
