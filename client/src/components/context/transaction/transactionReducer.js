export default (state, action) => {
	switch (action.type) {
		case 'GET_TRANSACTIONS':
			return {
				...state,
				transactions: action.payload
			}
		case 'TRANSACTION_ERROR':
			return {
				...state,
				error: action.payload
			}
		// case 'GET_EXPENSES':
		// 	return {
		// 		...state,
		// 		expenses: state.transactions.filter(transaction => {
		// 			return transaction.type === 'expense'
		// 		})
		// 	}
		default:
			return state
	}
}
