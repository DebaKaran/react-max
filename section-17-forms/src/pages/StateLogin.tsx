import React, { useState } from "react";
import { type LoginForm, type TouchedFields } from "../types/StateLogin.types";
import { INITIAL_FORM, INITIAL_TOUCHED, PASSWORD_MESSAGES } from "../utils/LoginFormData";
import InputField from "../components/InputField";
import { isEmail, isNotEmty } from "../utils/validation";

const StateLogin = () => {
  const [formData, setFormData] = useState<LoginForm>(INITIAL_FORM);
  const [didEdit, setDidEdit] = useState<TouchedFields>(INITIAL_TOUCHED);

  //Password validation object
  const passwordValidations = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    uppercase: /[A-Z]/.test(formData.password)
  };

  const isEmailInvalid = didEdit.email && !isEmail(formData.email) && !isNotEmty(formData.email);

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
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleInputBlur}
          error={
            isEmailInvalid && <p>Please enter a valid email address</p>
          } />


        <InputField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleInputBlur}
          error={
            didEdit.password && (
              <ul>
                {Object.entries(passwordValidations).map(([rule, isValid]) =>
                  !isValid ? (
                    <li key={rule}>
                      {PASSWORD_MESSAGES[rule as keyof typeof PASSWORD_MESSAGES]}
                    </li>
                  ) : null
                )}
              </ul>
            )
          }
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat" onClick={handleReset} type="button">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  )
}

export default StateLogin