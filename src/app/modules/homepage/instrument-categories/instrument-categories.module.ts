import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Routes, RouterModule } from "@angular/router";
import { DrummerComponent } from "./drummer/drummer.component";
import { KeyboardistComponent } from "./keyboardist/keyboardist.component";
import { LeadGuitaristComponent } from "./lead-guitarist/lead-guitarist.component";
import { LightningComponent } from "./lightning/lightning.component";
import { SaxophonistComponent } from "./saxophonist/saxophonist.component";
import { SoundEngineerComponent } from "./sound-engineer/sound-engineer.component";
import { TrumpeterComponent } from "./trumpeter/trumpeter.component";
import { BassGuitaristComponent } from "./bass-guitarist/bass-guitarist.component";
import { InstrumentCategoriesComponent } from "./instrument-categories.component";

const routes: Routes = [
  {
    path: "",
    component: InstrumentCategoriesComponent,
    children: [
      {
        path: "painost",
        component: DrummerComponent
      },
      {
        path: "drummer",
        component: DrummerComponent
      },
      {
        path: "keyboardist",
        component: KeyboardistComponent
      }
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    KeyboardistComponent,
    BassGuitaristComponent,
    DrummerComponent,
    LeadGuitaristComponent,
    LightningComponent,
    SaxophonistComponent,
    SoundEngineerComponent,
    TrumpeterComponent
  ]
})
export class InstrumentCategoriesModule {}
