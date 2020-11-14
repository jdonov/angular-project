import {WineriesModel, WineryModel} from '../../winery.model';
import * as AllWineryActions from './all-wineries.actions';

export interface State {
  wineries: WineriesModel[];
}

const initialState: State = {
  wineries: [
    {
      id: 'ID-Winery-1',
      name: 'Winery 1',
      description: 'This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      imageUrl: 'https://images.unsplash.com/photo-1593535388526-a6b8556c5351?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 'ID-Winery-2',
      name: 'Winery 2',
      description: 'This card has supporting text below as a natural lead-in to additional content.',
      imageUrl: 'https://images.unsplash.com/photo-1558241665-89718b74c89c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 'ID-Winery-3',
      name: 'Winery 3',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      imageUrl: 'https://images.unsplash.com/photo-1562497261-397e5f16eeb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
    },
    {
      id: 'ID-Winery-4',
      name: 'Winery 4',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      imageUrl: 'https://images.unsplash.com/photo-1558138818-d44c4dea7a6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }
  ]
};

export function allWineriesReducer(state: State = initialState, action: AllWineryActions.AllWineriesActions): any {
  switch (action.type) {
    case AllWineryActions.ADD_WINERY:
      return {
        ...state,
        wineries: [...state.wineries, action.payload]
      };
    default:
      return state;
  }
}
