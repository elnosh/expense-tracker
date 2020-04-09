import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'
import TransactionContext from '../../context/transaction/transactionContext'

//React-Bootsrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const NavbarComp = () => {
	const authContext = useContext(AuthContext)
	const { isAuthenticated, logout, user } = authContext

	const transactionContext = useContext(TransactionContext)
	const { clearTransactions } = transactionContext

	const onLogout = () => {
		logout()
		clearTransactions()
	}

	const authLinks = (
		<Fragment>
			<li>
				Hello {user && user.name}
				<a
					href="#!"
					onClick={onLogout}
					style={{ margin: '0px 0px 0px 20px' }}
				>
					<i
						className="fas fa-sign-out-alt"
						style={{ color: 'white' }}
					></i>
					<span className="hide-sm" style={{ color: 'white' }}>
						Logout
					</span>
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Button variant="dark">
					<Link to="/register" style={{ color: 'white' }}>
						Register
					</Link>
				</Button>
				<Button variant="dark">
					<Link to="/login" style={{ color: 'white' }}>
						Login
					</Link>
				</Button>
			</li>
		</Fragment>
	)

	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link href="/" style={{ color: '#ffffff' }}>
					{isAuthenticated ? authLinks : guestLinks}
				</Nav.Link>
			</Nav>
		</Navbar>
	)
}

export default NavbarComp
