import { useForm } from "react-hook-form";
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
    }
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
                }
            }
        }
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

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

                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm