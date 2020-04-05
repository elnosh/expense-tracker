import React, { useContext, useEffect, useState } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'
import TransactionItem from './TransactionItem'
import TransactionSearch from './TransactionsSearch'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

//React-Bootstrap
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

const TransactionList = () => {
	const styles = {
		width: '95%',
		margin: '70px 30px 20px',
	}

	const transactionContext = useContext(TransactionContext)
	const {
		transactions,
		filteredTransactions,
		income,
		expenses,
		getTransactions,
		getExpenses,
		getIncome,
	} = transactionContext

	const [type, setType] = useState('All')

	const onSelect = (e) => {
		if (e === 'Income') {
			getIncome()
			setType(e)
		} else if (e === 'Expenses') {
			getExpenses()
			setType(e)
		} else if (e === 'All') {
			getTransactions()
			setType(e)
		}
	}

	useEffect(() => {
		getTransactions()
		//eslint-disable-next-line
	}, [])

	// {transactions !== null ? (
	// 	filteredTransactions !== null ? (
	// 		filteredTransactions.map((transaction) => (
	// 			<TransactionItem
	// 				transaction={transaction}
	// 				key={transaction._id}
	// 			/>
	// 		))
	// 	) : (
	// 		transactions.map((transaction) => (
	// 			<TransactionItem
	// 				transaction={transaction}
	// 				key={transaction._id}
	// 			/>
	// 		))
	// 	)
	// ) : (
	// 	<tr></tr>
	// )}

	return (
		<div style={styles}>
			<Navbar bg="dark" variant="dark">
				<TransactionSearch />
				<DropdownButton
					id="dropdown-basic-button"
					title={type}
					variant="dark"
					style={{ float: 'right' }}
					onSelect={onSelect}
				>
					<Dropdown.Item eventKey="All">
						All Transactions
					</Dropdown.Item>
					<Dropdown.Item eventKey="Expenses">Expenses</Dropdown.Item>
					<Dropdown.Item eventKey="Income">Income</Dropdown.Item>
				</DropdownButton>
			</Navbar>
			<Table
				striped
				bordered
				hover
				variant="dark"
				style={{ margin: '10px 0px 0px 0px' }}
			>
				<thead>
					<tr>
						<th style={{ width: '15%' }}>Date</th>
						<th>Description</th>
						<th style={{ width: '10%' }}>Amount</th>
					</tr>
				</thead>
				<tbody>
					{transactions !== null ? (
						type === 'Expenses' && expenses !== null ? (
							expenses.map((transaction) => (
								<TransactionItem
									transaction={transaction}
									key={transaction._id}
								/>
							))
						) : type === 'Income' && income !== null ? (
							income.map((transaction) => (
								<TransactionItem
									transaction={transaction}
									key={transaction._id}
								/>
							))
						) : type === 'All' ? (
							filteredTransactions !== null ? (
								filteredTransactions.map((transaction) => (
									<TransactionItem
										transaction={transaction}
										key={transaction._id}
									/>
								))
							) : (
								transactions.map((transaction) => (
									<TransactionItem
										transaction={transaction}
										key={transaction._id}
									/>
								))
							)
						) : (
							<tr></tr>
						)
					) : (
						<tr></tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default TransactionList
