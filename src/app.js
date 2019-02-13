import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById('app')); //first arg is the parent component











// class OldSyntax{
//     constructor(){
//         this.name = 'Noe';
//     }
//     getGreeting(){
//         return `Hi. My name is ${this.name}`;
//     }
// }
// const oldSyntax = new OldSyntax();
// console.log(oldSyntax.getGreeting());
//---------------------------------
//Can avoid 'binding' with new syntax (no need for constructor)
// class NewSyntax{
//     name = 'Nico';
//     getGreeting = () => {
//         return `Hi. my name is ${this.name}`;
//     }
// }
// const newSyntax = new NewSyntax();
// const newGetGreeting = newSyntax.getGreeting;
// console.log(newGetGreeting());