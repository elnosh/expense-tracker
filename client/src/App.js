import React from 'react'
import NavbarComp from './components/layout/NavbarComp'
import Home from './components/pages/Home'
import TransactionState from './context/transaction/TransactionState'
import './App.css'

function App() {
	return (
		<TransactionState>
			<div className="App">
				<NavbarComp />
				<Home />
			</div>
		</TransactionState>
	)
}

export default App
