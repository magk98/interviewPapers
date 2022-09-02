import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlockListComponent} from "./block-list/block-list.component";


const routes: Routes = [
  {path: '', component: BlockListComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
