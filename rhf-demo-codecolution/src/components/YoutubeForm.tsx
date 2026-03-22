import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "./FormField";
import { validationRules } from "../validations/validation";
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
    }[]
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
                }]
            }
        }
    });

    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

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
                    <input type="text" id="username" {...register("username", validationRules.username)} />
                </FormField>

                <FormField label="Email" id="email"
                    error={errors.email?.message}>
                    <input type="text" id="email" {...register("email", validationRules.email)} />
                </FormField>

                <FormField label="Channel" id="channel"
                    error={errors.channel?.message}>
                    <input type="text" id="channel" {...register("channel", validationRules.channel)} />
                </FormField>

                <FormField label="Facebook" id="facebook"
                    error={errors.social?.facebook?.message}>
                    <input type="text" id="facebook" {...register("social.facebook", validationRules.facebook)} />
                </FormField>

                <FormField label="Twitter" id="twitter"
                    error={errors.social?.twitter?.message}>
                    <input type="text" id="twitter" {...register("social.twitter", validationRules.twitter)} />
                </FormField>

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
                        <div key={item.id} className="form-control">

                            {/* 
                                register dynamic field using index
                                structure becomes:
                                phoneNumbers: [{ phNumber: "value" }]
                            */}
                            <input
                                type="text"
                                {...register(`phoneNumbers.${index}.phNumber` as const, {

                                    // reuse common phone validation rule
                                    ...validationRules.phone,

                                    // make only first field (primary) required
                                    required: index === 0
                                        ? "Primary phone is required"
                                        : false
                                })}
                            />

                            {/* 
                                allow removing only secondary fields
                                (prevents deleting primary phone)
                            */}
                            {index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => remove(index)} // removes field at given index
                                >
                                    Remove
                                </button>
                            )}
                        </div>
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

                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm