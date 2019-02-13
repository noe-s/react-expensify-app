import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

const EditExpensePage = (props) =>{
    console.log(props);
    return ( 
        <div>
           <ExpenseForm 
            expense={props.expense}
            onSubmit={(expense) => {
                props.dispatch(editExpense(props.expense.id, expense));
                props.history.push('/');
                //dispatch action to edit expense
                //Redirect to dash 
            }}
           />
           <button onClick={ () => {
                props.dispatch(removeExpense({ id: props.expense.id}));  
                props.history.push('/');
            }}
            >Remove</button>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id) //adds expense if expense id = the props id
    };
};

export default connect(mapStateToProps)(EditExpensePage);