import { useState } from "react";

/*
Type definition for the hook parameters.

initialValue → starting value of the input field
validationFn → function used to validate the value
*/
type UseInputProps = {
    initialValue: string;
    validationFn: (value: string) => boolean;
};

/*
Custom hook to manage the state and validation of a single input field.
This hook can be reused for any form input (email, password, username, etc.)
*/
export const useInput = ({ initialValue, validationFn }: UseInputProps) => {

    /*
    enteredValue → current value typed in the input
    */
    const [enteredValue, setEnteredValue] = useState<string>(initialValue);

    /*
    didEdit → tracks if the user interacted with the field
    This prevents validation errors from showing before user interaction.
    */
    const [didEdit, setDidEdit] = useState<boolean>(false);

    /*
    Run the validation function on the current value.
    This keeps validation logic flexible and reusable.
    */
    const valueIsValid = validationFn(enteredValue);

    /*
    Runs when user types into the input field.
    Updates the value and hides validation errors while typing.
    */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        setEnteredValue(value);
        setDidEdit(false);
    };

    /*
    Runs when user leaves the input field.
    This triggers validation display.
    */
    const handleInputBlur = () => {
        setDidEdit(true);
    };

    /*
 Reset function that restores the input to its initial state
 */
    const reset = () => {
        setEnteredValue(initialValue);
        setDidEdit(false);
    };
    /*
    Values returned from the hook.
    These will be used inside the component.
    */
    return {
        value: enteredValue,          // input value
        handleChange,                 // change handler
        handleInputBlur,              // blur handler
        hasError: didEdit && !valueIsValid, // show error only after user interaction
        isValid: valueIsValid,         // validity state
        reset
    };
};