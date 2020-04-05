import React, { useContext, useEffect, useRef } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'

//React-Bootstrap
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const TransactionsSearch = () => {
	const transactionContext = useContext(TransactionContext)
	const {
		filteredTransactions,
		filterTransactions,
		clearFilter,
	} = transactionContext

	const text = useRef(' ')

	useEffect(() => {
		if (filteredTransactions === null) {
			text.current = ''
		}
	})

	const onChange = (e) => {
		if (text.current.value !== '') {
			filterTransactions(e.target.value)
		} else {
			clearFilter()
		}
	}

	return (
		<Form inline>
			<FormControl
				type="text"
				placeholder="Search Transaction"
				className="mr-sm-2"
				onChange={onChange}
			/>
		</Form>
	)
}

export default TransactionsSearch
