import React, { useContext, useEffect } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'

// React-Bootstrap
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

const TransactionsSummary = () => {
	const styles = {
		width: '18rem',
		margin: '30px 50px 20px'
	}

	const transactionContext = useContext(TransactionContext)
	const { getTransactions, transactions } = transactionContext
	let balanceAmount = 0

	useEffect(() => {
		getTransactions()
		//eslint-disable-next-line
	}, [])

	// get expenses amount
	const getExpenses = () => {
		let amount = 0
		transactions.map(transaction => {
			if (transaction.type === 'expense') {
				amount = amount + transaction.amount
			}
		})
		return (
			<Card.Text style={{ fontSize: '2em' }}>
				${amount.toFixed(2)}
			</Card.Text>
		)
	}

	// get income amount
	const getIncome = () => {
		let amount = 0
		transactions.map(transaction => {
			if (transaction.type === 'income') {
				amount += transaction.amount
			}
		})
		return (
			<Card.Text style={{ fontSize: '2em' }}>
				${amount.toFixed(2)}
			</Card.Text>
		)
	}

	// get balance amount
	const getBalance = () => {
		balanceAmount =
			getIncome().props.children[1] - getExpenses().props.children[1]
	}

	return (
		<div>
			<CardDeck>
				<Card bg="success" text="light" style={styles}>
					<Card.Header style={{ fontSize: '1.7em' }}>
						Income
					</Card.Header>
					<Card.Body>
						{transactions !== null ? (
							getIncome()
						) : (
							<Card.Text></Card.Text>
						)}{' '}
					</Card.Body>
				</Card>
				<Card bg="danger" text="light" style={styles}>
					<Card.Header style={{ fontSize: '1.7em' }}>
						Expenses
					</Card.Header>
					<Card.Body>
						{transactions !== null ? (
							getExpenses()
						) : (
							<Card.Text></Card.Text>
						)}{' '}
					</Card.Body>
				</Card>
				{transactions !== null ? getBalance() : <p></p>}
				<Card
					bg={balanceAmount >= 0 ? 'success' : 'danger'}
					text="light"
					style={styles}
				>
					<Card.Header style={{ fontSize: '1.7em' }}>
						Balance
					</Card.Header>
					<Card.Body>
						{transactions !== null ? (
							<Card.Text style={{ fontSize: '2em' }}>
								${balanceAmount.toFixed(2)}
							</Card.Text>
						) : (
							<Card.Text></Card.Text>
						)}{' '}
					</Card.Body>
				</Card>
			</CardDeck>
		</div>
	)
}

export default TransactionsSummary
