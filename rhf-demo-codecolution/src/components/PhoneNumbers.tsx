import type { FieldArrayWithId, FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetError } from "react-hook-form"
import type { IYoutubeFormInput } from "../typed/IYoutubeFormInput"
import FormField from "./FormField";
import { normalizePhone } from "../transformation/transform";

type PhoneNumbersProps = {
    fields: FieldArrayWithId<IYoutubeFormInput, "phoneNumbers", "id">[];
    append: (value: { phNumber: string }) => void;
    remove: (index: number) => void;
    register: UseFormRegister<IYoutubeFormInput>;
    errors: FieldErrors<IYoutubeFormInput>;
    getValues: UseFormGetValues<IYoutubeFormInput>;
    setError: UseFormSetError<IYoutubeFormInput>;

}
const PhoneNumbers = ({
    fields,
    append,
    remove,
    register,
    errors,
    getValues,
    setError
}: PhoneNumbersProps) => {

    const handleAddPhone = () => {
        const phones = getValues("phoneNumbers");

        //u can add max 4 phones
        if (phones.length >= 4) {
            setError(`phoneNumbers.${phones.length - 1}.phNumber`, {
                type: "manual",
                message: "Maximum number of phones allowed is 4"
            });
            return;
        }

        const lastIndex = phones.length - 1;
        const last = phones[lastIndex]?.phNumber;

        if (!last) {
            setError(`phoneNumbers.${lastIndex}.phNumber`, {
                type: "manual",
                message: "Fill current phone before adding new one"
            });
            return;
        }


        append({ phNumber: "" });
    }
    return (
        <div>
            {fields.map((item, index) => (
                <FormField key={item.id}
                    label={index === 0 ? "Primary Phone" : `Secondary Phone ${index}`}
                    id={`phone-${index}`}
                    error={errors.phoneNumbers?.[index]?.phNumber?.message}>
                    <input
                        type="text"
                        id={`phone-${index}`}
                        {...register(`phoneNumbers.${index}.phNumber` as const, {
                            //...validationRules.phone,
                            setValueAs: normalizePhone,
                            required: index === 0
                                ? "Primary phone is required"
                                : false
                        })}
                    />

                    {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                            Remove
                        </button>
                    )}
                </FormField>

            ))}

            {/* 
                        append new phone field to array
                        adds: { phNumber: "" }
                        RHF automatically updates UI + state
                    */}
            <button
                type="button"
                onClick={handleAddPhone}
            >
                Add Phone Number
            </button>
        </div>
    )
}

export default PhoneNumbers