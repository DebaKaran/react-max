import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "./FormField";
import { validationRules } from "../validations/validation";
import { normalizePhone, normalizeTwitter, trim, trimToLowercase } from "../transformation/transform";
interface IYoutubeFormInput {
    username: string;
    email: string;
    channel: string;
    social: {
        facebook: "",
        twitter: ""
    },
    //phoneNumbers: string[];  //removed static phoneNumbers array as we are going for dynamic one
    phoneNumbers: {
        phNumber: string
    }[],
    age: number,
    dob: Date
}
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

    const watchFacebook = watch("social.facebook");

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

                {watchFacebook && (<FormField label="Twitter" id="twitter"
                    error={errors.social?.twitter?.message}>
                    <input type="text" id="twitter" {...register("social.twitter", {
                        //...validationRules.twitter,
                        setValueAs: normalizeTwitter
                    })} />
                </FormField>)}

                {/* removed static phoneNumbers array as we are going for dynamic one */}

                {/* <FormField label="Primary Phone Number" id="primary-phone"
                    error={errors.phoneNumbers?.message}>
                    <input type="text" id="primary-phone" {...register("phoneNumbers.0", validationRules.phone)} />
                </FormField>
                <FormField label="Seconday Phone Number" id="seconday-phone"
                    error={errors.phoneNumbers?.message}>
                    <input type="text" id="seconday-phone" {...register("phoneNumbers.1", validationRules.phone)} />
                </FormField> */}

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
                                    ...validationRules.phone,
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
                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm