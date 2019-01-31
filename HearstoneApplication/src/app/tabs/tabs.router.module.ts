import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'card',
        children: [
          {
            path: '',
            loadChildren: '../card-deck/card-deck.module#CardDeckPageModule'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          }
        ]
      },
      {
        path: 'favorite',
        children: [
          {
            path: '',
            loadChildren: '../card-favorite/card-favorite.module#CardFavoritePageModule'
          }
        ]
      },
        {
            path: 'card/:cardDeckGroup/:cardDeck',
            children: [
                {
                    path: '',
                    loadChildren: '../card-listing/card-listing.module#CardListingPageModule'
                }
            ]
        },

        {
            path: 'card/:cardId',
            children: [
                {
                    path: '',
                    loadChildren: '../card-detail/card-detail.module#CardDetailPageModule'
                }
            ]
        },

      {
        path: '',
        redirectTo: '/tabs/card',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/intro',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
