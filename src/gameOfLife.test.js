import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';

export const storeFactory = (initialState) => {
	const createStoreWithMiddleware = applyMiddleware(middlewares[0])(createStore)
	return createStoreWithMiddleware(rootReducer, initialState)
}

import GameOfLife from './gameOfLife';


const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`)
}

const setup = (props={}, state={columns:20, rows: 20}) => {
	const store = storeFactory({})
	let shallowWrap = shallow(<GameOfLife {...props} store={store} />).dive()
	return shallowWrap;
}


test('renders without error', ()=> {
	const wrapper = setup();
	const game = wrapper.find(GameOfLife)
	const gameInstance = wrapper.instance();
	const neighbors = gameInstance.collectNeighbors(5,5)
	// console.log(neighbors)
	expect(wrapper.length).toBe(1);
})

