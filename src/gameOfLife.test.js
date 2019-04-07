import React from 'react';
import { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/reducers';
import { middlewares } from '../src/configureStore';
import GameOfLife from './gameOfLife';

const storeFactory = (initialState) => {
	const createStoreWithMiddleware = applyMiddleware(middlewares[0])(createStore)
	return createStoreWithMiddleware(rootReducer, initialState)
}

const findByTestAttr = (wrapper, val) => {
	return wrapper.find(`[data-test="${val}"]`)
}

const setup = (props={}, state={columns:5, rows: 5}) => {
	const store = storeFactory({})
	let shallowWrap = shallow(<GameOfLife {...props} store={store}/>).dive()
	shallowWrap.setState(state);
	return shallowWrap;
}

describe('check component instance methods', () => {
  let wrapper;
  let game;
  beforeEach(() => {
    wrapper = setup();
    game = wrapper.instance();
  });
  describe('collectNeighbors', () => {
    test('returns correct neighbors for no-wrap mode', () => {
      const neighbors = game.collectNeighbors(5,5);
      const correctNeighbors = ['4-4', '5-4', '6-4', '4-5', '6-5', '4-6', '5-6', '6-6'].sort().join();
      expect(neighbors.sort().join()).toBe(correctNeighbors);
    });
    test('returns correct neighbors for wrap mode at top left', () => {
    	const neighbors = game.collectNeighbors(0, 0, true);
        const correctNeighbors = ['4-4', '0-4', '1-4', '4-0', '1-0', '4-1', '0-1', '1-1'].sort().join();
        expect(neighbors.sort().join()).toBe(correctNeighbors);
    });
    test('returns correct neighbors for wrap mode at bottom right', () => {
    	const neighbors = game.collectNeighbors(4, 4, true);
        const correctNeighbors = ['0-0', '0-3', '0-4', '3-0', '3-3', '3-4', '4-0', '4-3'].sort().join();
        expect(neighbors.sort().join()).toBe(correctNeighbors);
    });
  });
  describe('createCells', () => {
  	test('returns correct sequence', () => {
  		const { sequence } = game.createCells(2,2);
  		const correctSequence = {
  		  '0-0': false,
  		  '0-1': false,
  		  '1-0': false,
  		  '1-1': false,
  		};
  		expect(sequence).toEqual(correctSequence)
  	});
  	test('returns correct number of cells', () => {
  		const { cells } = game.createCells(10, 10);
  		expect(Object.keys(cells).length).toBe(100)
  	});
  });



});

