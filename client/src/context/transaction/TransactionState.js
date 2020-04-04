import React, { useReducer } from 'react'
import axios from 'axios'
import TransactionContext from './transactionContext'
import TransactionReducer from './transactionReducer'

const TransactionState = props => {
	const initialState = {
		transactions: null,
		filteredTransactions: null,
		error: null
	}

	const [state, dispatch] = useReducer(TransactionReducer, initialState)

	// Get transactions
	const getTransactions = async () => {
		try {
			const res = await axios.get('/transactions')

			dispatch({ type: 'GET_TRANSACTIONS', payload: res.data })
		} catch (err) {
			dispatch({
				type: 'TRANSACTION_ERROR',
				payload: err
			})
		}
	}

	// Add transaction

	// Update transaction

	// Delete transaction

	// Filter transactions
	const filterTransactions = text => {
		dispatch({ type: 'FILTER_TRANSACTIONS', payload: text })
	}

	// Clear filtered transactions
	const clearFilter = () => {
		dispatch({ type: 'CLEAR_FILTER' })
	}

	return (
		<TransactionContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				filteredTransactions: state.filteredTransactions,
				getTransactions,
				filterTransactions,
				clearFilter
			}}
		>
			{props.children}
		</TransactionContext.Provider>
	)
}

export default TransactionState
