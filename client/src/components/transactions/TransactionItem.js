import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import TransactionContext from '../../context/transaction/transactionContext'

// React-Bootstrap
import Button from 'react-bootstrap/Button'

const TransactionItem = ({ transaction }) => {
	const { _id, date, description, amount } = transaction

	const transactionContext = useContext(TransactionContext)
	const { deleteTransaction } = transactionContext

	const onDelete = () => {
		deleteTransaction(_id)
	}

	return (
		<tr key={_id}>
			<td>{new Date(date).toDateString()}</td>
			<td>{description}</td>
			<td
				style={{
					backgroundColor:
						transaction.type === 'expense' ? '#c93a3a' : '#46aa47',
				}}
			>
				${amount.toFixed(2)}
			</td>
			<td>
				<Button variant="dark" onClick={onDelete}>
					x
				</Button>
			</td>
		</tr>
	)
}

TransactionItem.propTypes = {
	transaction: PropTypes.object.isRequired,
}

export default TransactionItem
