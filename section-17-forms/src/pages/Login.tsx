import React, { useRef } from "react";

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);



  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const enteredEmail = emailRef.current?.value;
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