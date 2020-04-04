import React, { useContext, useEffect } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'
import TransactionItem from './TransactionItem'
import TransactionSearch from './TransactionsSearch'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

//React-Bootstrap
import Table from 'react-bootstrap/Table'

const TransactionList = () => {
	const styles = {
		width: '95%',
		margin: '70px 30px 20px'
	}

	const transactionContext = useContext(TransactionContext)
	const {
		transactions,
		filteredTransactions,
		getTransactions
	} = transactionContext

	useEffect(() => {
		getTransactions()
		//eslint-disable-next-line
	}, [])

	return (
		<div style={styles}>
			<TransactionSearch />
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
						filteredTransactions !== null ? (
							filteredTransactions.map(transaction => (
								<TransactionItem transaction={transaction} />
							))
						) : (
							transactions.map(transaction => (
								<TransactionItem transaction={transaction} />
							))
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
