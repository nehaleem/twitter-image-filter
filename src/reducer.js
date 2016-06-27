import { combineReducers } from 'redux'

import imagePage from './images/reducer';

const mainReducer = combineReducers({
	imagePage,
});

export default mainReducer;
