import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import { DateRangePicker } from 'react-dates';
class ExpenseListFilters extends React.Component {

    state = {
        calendarFocused: null

    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    render(){
        return (
            <div>
                <input 
                    type="text" 
                    value={this.props.filters.text} 
                    onChange={(e) => {
                        this.props.dispatch(setTextFilter(e.target.value)); //use setTextFilter from 'Actions'
                    }} 
                />
                <select 
                    value={this.props.filters.sortBy}
                    onChange={(e) => {
                        if(e.target.value === 'date') {
                            this.props.dispatch(sortByDate());
                        } else if(e.target.value === 'amount'){
                            this.props.dispatch(sortByAmount());
                        }
                    }}
                >
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                </select>
                <DateRangePicker
                    startDate={this.props.filters.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={ this.onDatesChange } // method above
                    focusedInput={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    };
};

export default connect(mapStateToProps)(ExpenseListFilters); //first call takes 'map stateToprops func.', 2nd takes component.