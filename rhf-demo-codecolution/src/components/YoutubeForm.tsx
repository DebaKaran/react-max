import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "./FormField";
import { validationRules } from "../validations/validation";
import { normalizePhone, trim, trimToLowercase } from "../transformation/transform";
import type { IYoutubeFormInput } from "../typed/IYoutubeFormInput";
import TwitterField from "./TwitterField";

const YoutubeForm = () => {
    const form = useForm<IYoutubeFormInput>({
        defaultValues: async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
            const data = await res.json();

            return {
                username: data.name,
                email: data.email,
                channel: "YouTube",
                social: {
                    facebook: "",
                    twitter: ""
                },
                //removed static phoneNumbers array as we are going for dynamic one
                //phoneNumbers: ["", ""]
                phoneNumbers: [{
                    phNumber: ""
                }],
                age: 0,
                dob: new Date()
            }
        }
    });

    const { register, control, handleSubmit, formState, watch } = form;
    const { errors } = formState;

    //const watchFacebook = watch("social.facebook");


    const watchPhoneNumbers = watch("phoneNumbers");

    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm
        name: "phoneNumbers" // unique name for your Field Array
    });

    const onSubmit = (data: IYoutubeFormInput) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormField label="Username" id="username"
                    error={errors.username?.message}>
                    <input type="text" id="username" {...register("username", {
                        ...validationRules.username,
                        setValueAs: trim
                    })} />
                </FormField>

                <FormField label="Email" id="email"
                    error={errors.email?.message}>
                    <input type="text" id="email" {...register("email", {
                        ...validationRules.email,
                        setValueAs: trimToLowercase
                    })} />
                </FormField>
                <FormField label="Channel" id="channel"
                    error={errors.channel?.message}>
                    <input type="text" id="channel" {...register("channel", {
                        ...validationRules.channel,
                        setValueAs: trim
                    })} />
                </FormField>
                <FormField label="Facebook" id="facebook"
                    error={errors.social?.facebook?.message}>
                    <input type="text" id="facebook" {...register("social.facebook", {
                        //...validationRules.facebook,
                        setValueAs: trim
                    })} />
                </FormField>

                <TwitterField control={control} register={register} errors={errors} />
                {/* Dynamic Phone Numbers */}

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
                <FormField label="Age" id="age"
                    error={errors.age?.message}>
                    <input type="number" id="age" {...register("age",
                        {
                            ...validationRules.age,
                            valueAsNumber: true // 🔥 converts string → number
                        }
                    )} />
                </FormField>
                <FormField label="Date Of Birth" id="dob"
                    error={errors.dob?.message}>
                    <input type="date" id="dob" {...register("dob", {
                        ...validationRules.dob,
                        valueAsDate: true
                    })} />
                </FormField>
                <button disabled={!watchPhoneNumbers?.length}>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm