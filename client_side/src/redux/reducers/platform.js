import {SetPlatform} from "../actions/actionsType";

const initialState = {
  activePage: '',
  pathToPlatform: '',
  idPlatform: ''
}

export default function platform(state = initialState, action) {
  switch (action.type) {
    case SetPlatform:
      return {...state, ...action.elem};
    default:
      return state
  }
}