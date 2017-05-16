import * as types from './actionTypes';
import catApi from '../api/catApi';

export function loadCatsSuccess(cats) {
  return {type: types.LOAD_CATS_SUCCESS, cats};
}

export function deleteCatSuccess(cat) {
  return {type: types.DELETE_CAT_SUCCESS, cat}
}

export function loadCats() {
  return function(dispatch) {
    return catApi.getAllCats().then(cats => {
      dispatch(loadCatsSuccess(cats));
    }).catch(error => {
      throw(error);
    });
  };
}

export function deleteCat(cat) {
  return function(dispatch) {
    return catApi.deleteCat(cat).then(() => {
      console.log('Deleted ${cat.id}')
      dispatch(deleteCatSuccess(cat));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}