import React, { useState } from "react";

const StateLogin = () => {
  const initialForm = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialForm);

  //const isEmailValid = formData.email.includes('@');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Entered Email: " + formData.email);
    //Resetting state after submit
    setFormData(initialForm);
  }

  const handleReset = () => {
    setFormData(initialForm);
  }
  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={handleChange} value={formData.email} />
          {/* <div className="control-error">
            {!isEmailValid && <p>Please enter a valid email address</p>}
          </div> */}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={handleChange} value={formData.password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" onClick={handleReset}>Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  )
}

export default StateLogin