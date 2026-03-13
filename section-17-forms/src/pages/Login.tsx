import React, { useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const touched = {
    email: false,
    password: false
  };

  const [didEdit, setDidEdit] = useState(touched);

  const passwordMessages: Record<string, string> = {
    length: "Password must be at least 8 characters",
    number: "Password must contain a number",
    uppercase: "Password must contain an uppercase letter"
  };


  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const enteredEmail = emailRef.current.value;
    const emailIsInvalid = !enteredEmail.includes('@')

    if (emailIsInvalid) {
      setDidEdit(prev => ({
        ...prev, email: true
      }));

      //Now the cursor jumps back to the email input automatically when it has an error
      emailRef.current.focus();
      return;
    }

    const enteredPassword = passwordRef.current.value;

    // Define validation rules for the password.
    // Each property represents a rule and returns true if the rule is satisfied.
    const passwordValidations = {
      length: enteredPassword.length >= 8,          // Password must be at least 8 characters
      number: /\d/.test(enteredPassword),           // Password must contain at least one digit
      uppercase: /[A-Z]/.test(enteredPassword)      // Password must contain at least one uppercase letter
    };

    // Convert the validation object into an array of error messages.
    //
    // Step 1: Object.entries(passwordValidations)
    //   Converts object into array like:
    //   [
    //     ["length", true],
    //     ["number", false],
    //     ["uppercase", true]
    //   ]
    //
    // Step 2: filter()
    //   Keep only the rules that failed (isValid === false)
    //
    // Step 3: map()
    //   Convert the rule name into a user-friendly error message
    const errors = Object.entries(passwordValidations)
      .filter(([_, isValid]) => !isValid)
      .map(([rule]) => passwordMessages[rule]);

    // Store the validation errors in React state.
    // The UI will later display these messages if validation fails.
    setPasswordErrors(errors);

    // If there are any validation errors:
    if (errors.length > 0) {

      // Mark the password field as "edited" so the error messages can be shown
      setDidEdit(prev => ({
        ...prev,
        password: true
      }));

      // Move the cursor back to the password input field
      // so the user can immediately fix the problem
      passwordRef.current.focus();

      // Stop form submission
      return;
    }

    console.log("Entered Email: " + enteredEmail);
    console.log("Entered Password: " + enteredPassword);

    //Resetting the form when the form is successfully submitted
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          <div className="control-error">
            {didEdit.email && <p>Please enter a valid email address</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>

          {/* Uncontrolled password input accessed using useRef */}
          <input id="password" type="password" name="password" ref={passwordRef} />

          {/* Display password validation errors only after validation fails */}
          <div>
            {didEdit.password && passwordErrors.length > 0 && (
              <ul>
                {passwordErrors.map((msg, index) => (
                  <li key={index}>{msg}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat" type="reset">Reset</button>
        <button className="button" type="submit">Login</button>
      </p>
    </form>
  )
}

export default Login