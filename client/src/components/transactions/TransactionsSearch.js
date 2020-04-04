import React, { useContext, useEffect, useRef } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'

//React-Bootstrap
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const TransactionsSearch = () => {
	const transactionContext = useContext(TransactionContext)
	const {
		filteredTransactions,
		filterTransactions,
		clearFilter
	} = transactionContext

	const text = useRef(' ')

	useEffect(() => {
		if (filteredTransactions === null) {
			text.current = ''
		}
	})

	const onChange = e => {
		if (text.current.value !== '') {
			filterTransactions(e.target.value)
		} else {
			clearFilter()
		}
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Form inline>
				<FormControl
					type="text"
					placeholder="Search Transaction"
					className="mr-sm-2"
					onChange={onChange}
				/>
			</Form>
			<DropdownButton
				id="dropdown-basic-button"
				title="All Transactions"
				variant="dark"
				style={{ float: 'right' }}
			>
				<Dropdown.Item eventKey="all">All</Dropdown.Item>
				<Dropdown.Item eventKey="expenses">Expenses</Dropdown.Item>
				<Dropdown.Item eventKey="income">Income</Dropdown.Item>
			</DropdownButton>
		</Navbar>
	)
}

export default TransactionsSearch
