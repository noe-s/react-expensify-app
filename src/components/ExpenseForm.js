import React from 'react';
import moment from 'moment'; //http://momentjs.com/
import { SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            //if props.expense exists: input desc. in form input, else: leave blank
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '', 
            amount: props.expense ? (props.expense.amount / 100).toString() : '',
            createdAt: props. expense ? moment(props.expense.createdAt) : moment(),
            calendarFocused: false,
            error:''
        }
    };
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;

        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) { //www.regex101.com
            this.setState(() => ({ amount }));
        } 
    };
    onDateChange = (createdAt) => {
        if(createdAt){
            this.setState(() =>  ({ createdAt }));
        }
    };
    onFocusChange = ({ focused }) =>{
        this.setState(() => ({ calendarFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
            //set error state
            this.setState(() => ({error: 'Error: Please submit both a description and and amount for your expense'}))
        } else{
            this.setState(() => ({error: ''}));
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount,10 ) * 100, //convert string to number in in $
                createdAt: this.state.createdAt.valueOf(), //convert moment -> timestamp for JS
                note: this.state.note
            });
        }
    };
    render(){
        return(
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text" 
                        placeholder="Description"
                        autoFocus
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />

                    <SingleDatePicker
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={(day) => false}
                    />
                    <textarea 
                        placeholder="Add a note your expense (optional)"
                        value={this.state.note}
                        onChange={this.onNoteChange}
                    >
                    </textarea>
                    <button>Add Expense</button>
                </form>

            </div>
        )
    }
};

