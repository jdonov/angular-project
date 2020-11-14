import {WineryModel} from '../../winery.model';
import * as WineryActions from './winery.actions';

export interface State {
  winery: WineryModel;
}

const initialState: State = {
  winery: {
    id: 'ID-Winery-1',
    name: 'Winery 1',
    description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    imageUrl: 'https://images.unsplash.com/photo-1593535388526-a6b8556c5351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    address: {
      region: 'South Western',
      city: 'Petrich',
      street: 'Boris 3A'
    },
    wines: [
      {
        id: 'ID-Wine-1',
        name: 'Wine 1 - Store',
        imageUrl: 'https://images.unsplash.com/photo-1546944517-4f38480ff03c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 60.00,
        description: 'Very good wine',
        rating: 2,
        yourRating: 3
      },
      {
        id: 'ID-Wine-2',
        name: 'Wine 2 - Store',
        imageUrl: 'https://images.unsplash.com/photo-1588406590000-6e285b62c833?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 74.99,
        description: 'Wonderful wine',
        rating: 3,
        yourRating: 2
      },
      {
        id: 'ID-Wine-3',
        name: 'Wine 3 - Store',
        imageUrl: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
        price: 150.00,
        description: 'The best one',
        rating: 4,
        yourRating: 4
      }
    ]
  }
};

export function wineryReducer(state: State = initialState, action: WineryActions.WineryActions): any {
  switch (action.type) {
    default:
      return state;
  }
}
