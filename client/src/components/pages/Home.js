import React from 'react'
import TransactionSummary from '../transactions/TransactionsSummary'
import TransactionList from '../transactions/TransactionList'

const Home = () => {
	return (
		<div>
			<TransactionSummary />
			<TransactionList />
		</div>
	)
}

export default Home
