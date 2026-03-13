import React, { useRef, useState } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const touched = {
    email: false,
    password: false
  };

  const [didEdit, setDidEdit] = useState(touched);

  // const passwordMessages: Record<string, string> = {
  //   length: "Password must be at least 8 characters",
  //   number: "Password must contain a number",
  //   uppercase: "Password must contain an uppercase letter"
  // };


  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current || !passwordRef.current) {
      return;
    }

    const enteredEmail = emailRef.current?.value;
    const emailIsInvalid = !enteredEmail.includes('@')

    if (emailIsInvalid) {
      setDidEdit(prev => ({
        ...prev, email: true
      }));

      //Now the cursor jumps back to the email input automatically when it has an error
      emailRef.current.focus();
      return;
    }

    const enteredPassword = passwordRef.current?.value;

    console.log("Entered Email: " + enteredEmail);
    console.log("Entered Password: " + enteredPassword);
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
          <input id="password" type="password" name="password" ref={passwordRef} />
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