import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import Search from './Search';

const rootReducer = combineReducers({
  form: formReducer.plugin({
    searchForm: Search
  })
});

export default rootReducer;
