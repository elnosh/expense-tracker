import React, { useContext, useEffect } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'

//React-Bootstrap
import Table from 'react-bootstrap/Table'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

const TransactionList = () => {
	const styles = {
		width: '95%',
		margin: '70px 30px 20px'
	}

	const transactionContext = useContext(TransactionContext)
	const { transactions, getTransactions } = transactionContext

	useEffect(() => {
		getTransactions()
		//eslint-disable-next-line
	}, [])

	return (
		<div style={styles}>
			<Navbar bg="dark" variant="dark">
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search Transaction"
						className="mr-sm-2"
					/>
					<Button variant="light">Search</Button>
				</Form>
				<DropdownButton
					id="dropdown-basic-button"
					title="All Transactions"
					style={{ margin: '10px 5px 10px 700px' }}
				>
					<Dropdown.Item>All</Dropdown.Item>
					<Dropdown.Item>Expenses</Dropdown.Item>
					<Dropdown.Item>Income</Dropdown.Item>
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
						transactions.map(transaction => (
							<tr key={transaction._id}>
								<td>
									{new Date(transaction.date).toDateString()}
								</td>
								<td>{transaction.description}</td>
								<td
									style={{
										backgroundColor:
											transaction.type === 'expense'
												? '#c93a3a'
												: '#46aa47'
									}}
								>
									${transaction.amount.toFixed(2)}
								</td>
							</tr>
						))
					) : (
						<tr></tr>
					)}
				</tbody>
			</Table>
		</div>
	)
}

export default TransactionList
