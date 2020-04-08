import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import AlertContext from '../../context/alert/alertContext'

//Material UI
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const Login = (props) => {
	const classes = useStyles()

	const authContext = useContext(AuthContext)
	const { loginUser, error, isAuthenticated, clearErrors } = authContext

	const alertContext = useContext(AlertContext)
	const { setAlert } = alertContext

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/')
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger')
			clearErrors()
		}

		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		email: '',
		password: '',
	})

	const { email, password } = user

	const onChange = (e) =>
		setUser({ ...user, [e.target.name]: e.target.value })

	const onSubmit = (e) => {
		e.preventDefault()
		if (email === '' || password === '') {
			setAlert('Please fill in the fields', 'danger')
		} else {
			loginUser({
				email,
				password,
			})
		}

		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger')
			clearErrors()
		}
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}></Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								id="email"
								label="Email"
								name="email"
								autoComplete="email"
								onChange={onChange}
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={onChange}
								required
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={onSubmit}
					>
						Login
					</Button>
				</form>
			</div>
		</Container>
	)
}

export default Login
