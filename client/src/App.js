import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavbarComp from './components/layout/NavbarComp'
import Home from './components/pages/Home'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import PrivateRoute from './components/routing/PrivateRoute'
import Alerts from './components/layout/Alerts'
import TransactionState from './context/transaction/TransactionState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'
import setAuthToken from './utils/setAuthToken'

import './App.css'

if (localStorage.token) {
	setAuthToken(localStorage.token)
}

const App = () => {
	return (
		<AuthState>
			<TransactionState>
				<AlertState>
					<Router>
						<Fragment>
							<NavbarComp />
							<div className="App">
								<Alerts />
								<Switch>
									<PrivateRoute
										exact
										path="/"
										component={Home}
									/>
									<Route
										exact
										path="/login"
										component={Login}
									/>
									<Route
										exact
										path="/register"
										component={Register}
									/>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</TransactionState>
		</AuthState>
	)
}

export default App
