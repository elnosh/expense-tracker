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
		case 'FILTER_TRANSACTIONS':
			return {
				...state,
				filteredTransactions: state.transactions.filter(transaction => {
					const regex = new RegExp(`${action.payload}`, 'gi')
					return transaction.description.match(regex)
				})
			}
		case 'CLEAR_FILTER':
			return {
				...state,
				filteredTransactions: null
			}
		default:
			return state
	}
}
