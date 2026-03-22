import type { FieldArrayWithId, FieldErrors, UseFormRegister } from "react-hook-form"
import type { IYoutubeFormInput } from "../typed/IYoutubeFormInput"
import FormField from "./FormField";
import { normalizePhone } from "../transformation/transform";

type PhoneNumbersProps = {
    fields: FieldArrayWithId<IYoutubeFormInput, "phoneNumbers", "id">[];
    append: (value: { phNumber: string }) => void;
    remove: (index: number) => void;
    register: UseFormRegister<IYoutubeFormInput>;
    errors: FieldErrors<IYoutubeFormInput>
}
const PhoneNumbers = ({
    fields,
    append,
    remove,
    register,
    errors
}: PhoneNumbersProps) => {

    return (
        <div>
            {fields.map((item, index) => (
                <FormField key={item.id}
                    label={index === 0 ? "Primary Phone" : `Secondary Phone ${index}`}
                    id={`phone-${index}`}
                    error={errors.phoneNumbers?.[index]?.message}>
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
                onClick={() => append({ phNumber: "" })}
            >
                Add Phone Number
            </button>
        </div>
    )
}

export default PhoneNumbers