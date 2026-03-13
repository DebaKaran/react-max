import InputField from "../components/InputField";
import { PASSWORD_MESSAGES } from "../utils/LoginFormData";
import { isEmail, isNotEmty, hasMinimunLength } from "../utils/validation";
import { useInput } from "../hooks/useInput";

/*
Login component using reusable input hook.
This component now focuses mainly on UI and submission logic.
*/
const StateLogin = () => {

  /*
  Email input logic handled by the custom hook.

  value → current input value
  handleChange → updates value
  handleInputBlur → marks field as touched
  hasError → indicates validation error
  isValid → indicates validation success
  */
  const {
    value: emailValue,
    handleChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    isValid: emailIsValid,
    reset: resetEmail
  } = useInput({
    initialValue: "",
    validationFn: (value) => isEmail(value) && isNotEmty(value)
  });

  /*
  Password input managed by the same reusable hook.
  */
  const {
    value: passwordValue,
    handleChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    reset: resetPassword
  } = useInput({
    initialValue: "",
    validationFn: (value) => hasMinimunLength(value, 8)
  });

  /*
  Password rule checks for UI feedback.
  These rules are used only for displaying helpful messages.
  */
  const passwordValidations = {
    length: passwordValue.length >= 8,
    number: /\d/.test(passwordValue),
    uppercase: /[A-Z]/.test(passwordValue)
  };

  /*
  Form submission handler.
  Prevents default browser form submission and validates inputs.
  */
  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Stop submission if validation fails
    if (!emailIsValid || !passwordIsValid) {
      return;
    }

    // Example success behavior
    console.log("Entered Email:", emailValue);
    console.log("Entered Password:", passwordValue);
    handleReset();
  };

  /*
  Reset handler.
  Reloading the page resets all input state.
  (In real apps we usually reset the hook state instead)
  */
  const handleReset = () => {
    resetEmail();
    resetPassword();
  };

  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">

        {/* Email Input Field */}
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          error={
            emailHasError && <p>Please enter a valid email address</p>
          }
        />

        {/* Password Input Field */}
        <InputField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          error={
            passwordHasError && (
              <ul>
                {
                  /*
                  Display all password rules that currently fail
                  */
                  Object.entries(passwordValidations).map(([rule, isValid]) =>
                    !isValid ? (
                      <li key={rule}>
                        {PASSWORD_MESSAGES[rule as keyof typeof PASSWORD_MESSAGES]}
                      </li>
                    ) : null
                  )
                }
              </ul>
            )
          }
        />

      </div>

      <p className="form-actions">
        {/* Reset Button */}
        <button
          className="button button-flat"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>

        {/* Submit Button */}
        <button className="button" type="submit">
          Login
        </button>
      </p>
    </form>
  );
};

export default StateLogin;