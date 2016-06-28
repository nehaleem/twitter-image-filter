import { combineReducers } from 'redux'

import filters from './filters/reducer';
import tweets from './tweets/reducer';

const mainReducer = combineReducers({
	filters,
	tweets,
});

export default mainReducer;
