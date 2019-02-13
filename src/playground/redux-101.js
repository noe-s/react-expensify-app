import { createStore } from 'redux';

// Action generators - Functions tht return Action objects (i.e. INCREMENT).

const incrementCount = ({ incrementBy = 1 } = {}) =>({
    type: 'INCREMENT',
    incrementBy //<- short hand for this: incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () =>({
    type: 'RESET',
});

const setCount = ({ count }) =>({
    type: 'SET',
    count 
});

//Reducers
//1. Reducers are 'pure' functions 
//   - output only determined by input. i.e. returns only determined by state & action (in eg. below).
//2. Never change state or action

const countReducer = ((state = { count: 0 }, action) => { 
    switch(action.type){ //Go through actions 
        case 'INCREMENT':
            return{
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return{
                count: state.count - action.decrementBy
            };
        case 'SET':
            return{
                count: action.count 
            };
        case 'RESET':
            return{
                count: 0
            };
        default:
            return state
        }
});

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() =>{
    console.log(store.getState());
    //call unsubscribe() when need to stop.
});

//Increment
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
//Decrement
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10}));
//RESET
store.dispatch(resetCount());
//SET
store.dispatch(setCount({ count: 101}));
