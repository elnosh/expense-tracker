export default (state, action) => {
	switch (action.type) {
		case 'GET_TRANSACTIONS':
			return {
				...state,
				transactions: action.payload,
			}
		case 'ADD_TRANSACTION':
			return {
				...state,
				transactions: [action.payload, ...state.transactions],
			}
		case 'DELETE_TRANSACTION':
			return {
				...state,
				transactions: state.transactions.filter(
					(transaction) => transaction._id !== action.payload
				),
			}
		case 'GET_EXPENSES':
			return {
				...state,
				expenses: state.transactions.filter(
					(transaction) => transaction.type === 'expense'
				),
			}
		case 'GET_INCOME':
			return {
				...state,
				income: state.transactions.filter(
					(transaction) => transaction.type === 'income'
				),
			}
		case 'TRANSACTION_ERROR':
			return {
				...state,
				error: action.payload,
			}
		case 'CLEAR_TRANSACTIONS':
			return {
				...state,
				transactions: null,
				filteredTransactions: null,
				error: null,
			}
		case 'FILTER_TRANSACTIONS':
			return {
				...state,
				filteredTransactions: state.transactions.filter(
					(transaction) => {
						const regex = new RegExp(`${action.payload}`, 'gi')
						return transaction.description.match(regex)
					}
				),
			}
		case 'CLEAR_FILTER':
			return {
				...state,
				filteredTransactions: null,
			}
		default:
			return state
	}
}
