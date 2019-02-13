const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState,action) =>{
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

