import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlockListComponent} from "./block-list/block-list.component";
import {BlockDetailsComponent} from "./block-details/block-details.component";


const routes: Routes = [
  {path: '', component: BlockListComponent},
  {path: ':id', component: BlockDetailsComponent},
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
