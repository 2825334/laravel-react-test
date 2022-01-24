import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import TableComponents from './TableComponent';

function Index()  {
	const [formValue , setFormValue]  = useState({
		name: '',
		email: '',
		phone: '',
		address: '',

	});

	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isSuccess, setIsSuccess] 	= useState(false);
	const [isError, setIsError]			= useState(false);

	const [isFetch, setIsFetch] = useState('false');

	const validEmail =(email) => {
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		if (!pattern.test(email)) {
			return false;
		} 
		return true;
	}

	const handleName = (event) => {
		setFormValue({...formValue, name: event.target.value})
	}
	const handleEmail = (event) => {
		setFormValue({...formValue, email: event.target.value})
	}
	const handlePhone = (event) => {
		setFormValue({...formValue, phone: event.target.value})
	}
	const handleAddress = (event) => {
		setFormValue({...formValue, address: event.target.value})
	}

	const handleSubmit = event => {
		event.preventDefault();
		setIsSubmitted(true);

		if (formValue.name != '' && formValue.email != '' && validEmail(formValue.email) == true 
			&& formValue.phone.length >= 10 && formValue.phone.length <= 10 && formValue.address != '') {
				onSave()
				setIsSuccess(true)
			
				setTimeout(() => {
					setIsSuccess(false)
				}, 2000)
		}
	};

	const onSave = () => {
		const params = {
			name	: formValue.name,
			email 	: formValue.email,
			phone   : formValue.phone,
			address : formValue.address,
		};
		
		axios.post('api/user', params)
		.then((response) => {
			setIsFetch('true')

			setTimeout(() => {
				setIsFetch('true')
			}, 500)
		}).catch(error => {
			setIsError(true)
			
			setTimeout(() => {
				setIsError(false)
			}, 2000)
		});
		setFormValue({
			name: '',
			email: '',
			phone: '',
			address: '',
	
		})
		setIsSubmitted(false)

		//setFormValue({...formValue, email: ''})
		//setFormValue({...formValue, phone: ''})
		//setFormValue({...formValue, address: ''})
	}

	return (
		<div>
			<div className="row justify-content-center">
				<div className="col-lg-10 col-md-12">
					<div className="wrapper">
						<div className="row no-gutters">
							<div className="col-md-12 d-flex align-items-stretch">
								<div className="contact-wrap w-100 p-md-5 p-4">
									
									<h3 className="mb-4">Get in touch</h3>
									<div id="form-message-warning" className="mb-4" />
									{
										isSuccess ? 
										<div role="alert" className="mb-4 alert alert-success">
											Your details have submitted, thank you!
										</div> : 
										isError  ? 
										<div role="alert" className="mb-4 alert alert-danger">
											Something went wrong. Please try later
										</div> : ''
									}
									
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<input type="text" 
														className="form-control" 
														name="name" 
														placeholder="Name" 
														onChange={handleName}
														value={formValue.name}
													/>
												</div>
												{
													(isSubmitted &&  formValue.name == "") ? 
													<span style={{color: 'red'}}> Please Enter Your Name </span> :
													''
												}
											</div>
											
											<div className="col-md-6">
												<div className="form-group">
													<input type="email" 
														className="form-control" 
														name="email" 
														placeholder="Email" 
														onChange={handleEmail}
														value={formValue.email} 
													/>
												</div>
												{
													(isSubmitted &&  formValue.email == "") ? 
													<span style={{color: 'red'}}> Please Enter Your Email </span> :
													(isSubmitted &&  validEmail(formValue.email) == "") ?
													<span style={{color: 'red'}}> Email Should be Valid </span> :
													''
												}
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="number" 
														className="form-control" 
														name="Phone No" 
														placeholder="Phone No" 
														onChange={handlePhone}
														value={formValue.phone} 
													/>
												</div>
												{
													(isSubmitted &&  formValue.phone == "") ? 
													<span style={{color: 'red'}}> Please Enter Your Phone </span> :
													(isSubmitted &&  formValue.phone.length > 10) ? 
													<span style={{color: 'red'}}> Phone Length must be equal to 10 </span> :
													(isSubmitted &&  formValue.phone.length < 10) ? 
													<span style={{color: 'red'}}> Phone Length must be equal to 10 </span> :
													''
												}
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="text" 
														className="form-control" 
														name="address" 
														placeholder="Address" 
														onChange={handleAddress}
														value={formValue.address} 
													/>
													{
														(isSubmitted &&  formValue.address == "") ? 
														<span style={{color: 'red'}}> Please Enter Your Addresss </span> :''
													}
												</div>
											</div>
											<div className="col-md-12">
												<div className="form-group">
													<input type="submit" className="btn btn-primary" value="Submit"/>
													<div className="submitting" />
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<TableComponents fetch={isFetch}></TableComponents>
		</div>
	);
}

export default Index;

if (document.getElementById('app')) {
	ReactDOM.render(<Index />, document.getElementById('app'));
}