import React, { useState } from "react";
import { type LoginForm, type TouchedFields } from "../types/StateLogin.types";
import { INITIAL_FORM, INITIAL_TOUCHED, PASSWORD_MESSAGES } from "../utils/LoginFormData";

const StateLogin = () => {
  const [formData, setFormData] = useState<LoginForm>(INITIAL_FORM);
  const [didEdit, setDidEdit] = useState<TouchedFields>(INITIAL_TOUCHED);

  //Password validation object
  const passwordValidations = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password)
  };

  const isEmailInvalid = didEdit.email && !formData.email.includes('@');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Extract the name and value from the input that triggered the event
    // Example: name="email", value="abc@gmail.com"
    const { name, value } = event.target;

    // Update the corresponding field in the form state
    // We copy the previous state using the spread operator
    // and overwrite only the field that changed
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

    // When the user starts typing again, we reset the "didEdit" flag
    // for that specific field.
    // This hides the validation error while the user is editing the input.
    // Validation will run again when the user leaves the field (onBlur).
    setDidEdit(prev => ({
      ...prev,
      [name]: false
    }));
  };
  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.email === '') {
      setDidEdit(prev => ({
        ...prev, email: true
      }))
      return; // stop submission
    }
    console.log("Entered Email: " + formData.email);

    if (formData.password === '') {
      setDidEdit(prev => ({
        ...prev, password: true
      }))
      return; // stop submission
    }

    //Resetting state after submit
    setFormData(INITIAL_FORM);
    setDidEdit(INITIAL_TOUCHED);
  }

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setDidEdit(INITIAL_TOUCHED);
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setDidEdit(prev => ({
      ...prev,
      [name]: true
    }));
  }
  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={handleChange} value={formData.email} onBlur={handleInputBlur} />
          <div className="control-error">
            {isEmailInvalid && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={handleChange} value={formData.password} onBlur={handleInputBlur} />
          <div className="control-error">
            {didEdit.password && (
              <ul>
                {Object.entries(passwordValidations).map(([rule, isValid]) => (
                  !isValid && (
                    <li key={rule}>
                      {PASSWORD_MESSAGES[rule as keyof typeof PASSWORD_MESSAGES]}
                    </li>
                  )
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" onClick={handleReset} type="button">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  )
}

export default StateLogin