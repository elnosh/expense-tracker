import React from 'react'
import PropTypes from 'prop-types'

const TransactionItem = ({ transaction }) => {
	const { _id, date, description, amount } = transaction

	return (
		<tr key={_id}>
			<td>{new Date(date).toDateString()}</td>
			<td>{description}</td>
			<td
				style={{
					backgroundColor:
						transaction.type === 'expense' ? '#c93a3a' : '#46aa47'
				}}
			>
				${amount.toFixed(2)}
			</td>
		</tr>
	)
}

TransactionItem.propTypes = {
	transaction: PropTypes.object.isRequired
}

export default TransactionItem
