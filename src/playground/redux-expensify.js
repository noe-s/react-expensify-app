import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//ADD_EXPENSE
const addExpense = (
    { description = '',
      note = '',
      amount=0,
      createdAt=0 
    } = {}
) =>({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount, 
        createdAt
    }
});

//REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id: id
});

//EDIT_EXPENSE
const editExpense = (id, updates) =>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = '') =>({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_DATE
const sortByDate = () =>({
    type: 'SORT_BY_DATE',
});

//SORT_BY_AMOUNT
const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT',
});

//SET_START_DATE
const setStartDate = (startDate = undefined) =>({
    type: 'SET_START_DATE',
    startDate
});
//SET_END_DATE
const setEndDate = (endDate = undefined) =>({
    type: 'SET_END_DATE',
    endDate
});
//Expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState,action) =>{
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state, //spread operator: doesn't change state, tho makes new array based on it
                action.expense
            ];
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id){
                    return {
                        ...expense, //take existing whole object
                        ...action.updates //update changed fields
                    };
                } else{
                    return expense;
                }
            })
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id != action.id); 
        default:
            return state;
    }
};

//Filters Reducer
const filterReducerDefaultState={
    text: '', 
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined 
};
const filtersReducer = (state = filterReducerDefaultState,action) =>{
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return{
                ...state,
                text: action.text
            };
        case 'SORT_BY_DATE':
            return{
                ...state,
                sortBy: 'date' 
            };
                case 'SORT_BY_AMOUNT':
        return{
            ...state,
            sortBy: 'amount'
        };
        case 'SET_START_DATE':
            return{
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return{
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    };
};

//visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        //expenses.description has text variable string inside
        //includes(), convert to lowerCase
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch; //if they're all true
    }).sort((a, b) =>{
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1; 
        }   else if(sortBy === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

//Store creation
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100, createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }));

//store.dispatch(setTextFilter('ffe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount()); //sort by prop: Amount
// store.dispatch(sortByDate()); //sort by prop: date

//store.dispatch(setStartDate(0)); //StartDate = 125
// store.dispatch(setStartDate()); //back to undefined
//store.dispatch(setEndDate(999)); //endDate = 1250


const demoState = {
    expenses: [{
        id: 'rando',
        description: 'Feb Rent',
        note: 'last payment for 441 Ave. du Presidnet Kennedy',
        amount: 80000, //800 in cents
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount', //date or amount
        startDate: undefined,
        endDate: undefined
    }
};

// const user = {
//     name: 'Noe',
//     age: 22
// };

// console.log({
//     ...user,
//     location: 'Montreal',
//     age: 44
// });