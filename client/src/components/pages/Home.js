import React, { useContext, useEffect } from 'react'
import TransactionSummary from '../transactions/TransactionsSummary'
import TransactionList from '../transactions/TransactionList'
import AuthContext from '../../context/auth/authContext'

const Home = () => {
	const authContext = useContext(AuthContext)

	useEffect(() => {
		authContext.loadUser()
		// eslint-disable-next-line
	}, [])

	return (
		<div>
			<TransactionSummary />
			<TransactionList />
		</div>
	)
}

export default Home
