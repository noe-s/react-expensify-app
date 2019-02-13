import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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