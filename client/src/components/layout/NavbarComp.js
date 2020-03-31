import React from 'react'

//React-Bootsrap
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const NavbarComp = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">Expense Tracker</Navbar.Brand>
			<Nav className="ml-auto">
				<Nav.Link href="/" style={{ color: '#ffffff' }}>
					Home
				</Nav.Link>
			</Nav>
		</Navbar>
	)
}

export default NavbarComp
