import React, { useState, useContext } from 'react'
import TransactionContext from '../../context/transaction/transactionContext'

// React-Bootstrap
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const AddTransactionModal = () => {
	const transactionContext = useContext(TransactionContext)
	const { addTransaction } = transactionContext

	const [show, setShow] = useState(false)
	const [transaction, setTransaction] = useState({
		amount: null,
		description: '',
		type: '',
	})

	const { amount, description, type } = transaction

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const onChange = (e) => {
		setTransaction({ ...transaction, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		addTransaction(transaction)
	}

	return (
		<div>
			<Button variant="outline-light" onClick={handleShow}>
				+
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add Transaction</Modal.Title>
				</Modal.Header>
				<Form onSubmit={onSubmit}>
					<Modal.Body>
						<Form.Group controlId="formGroupAmount">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="input"
								placeholder="Enter amount"
								name="amount"
								value={amount}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group controlId="formGroupDescription">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="string"
								placeholder="Description"
								name="description"
								value={description}
								onChange={onChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label as="legend" column sm={2}>
								Type
							</Form.Label>
							<Col sm={10}>
								<Form.Check
									type="radio"
									label="Expense"
									name="type"
									value="expense"
									checked={type === 'expense'}
									onChange={onChange}
								/>
								<Form.Check
									type="radio"
									label="Income"
									name="type"
									value="personal"
									checked={type === 'income'}
									onChange={onChange}
								/>
							</Col>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button
							variant="primary"
							onClick={handleClose}
							type="submit"
						>
							Save
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	)
}

export default AddTransactionModal
