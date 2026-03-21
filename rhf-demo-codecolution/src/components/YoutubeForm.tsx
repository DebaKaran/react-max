import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormField from "./FormField";
interface IYoutubeFormInput {
    username: string;
    email: string;
    channel: string
}
const YoutubeForm = () => {
    const form = useForm<IYoutubeFormInput>();
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: IYoutubeFormInput) => console.log(data);

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <FormField label="Username" id="username"
                    error={errors.username?.message}>
                    <input type="text" id="username" {...register("username", {

                        required: {
                            value: true,
                            message: "Username is required"
                        },
                        validate: (value) => {
                            if (value.length < 3) return "Minimum 3 characters";
                            if (value === "admin") return "Username 'admin' is not allowed";
                            return true;
                        }


                    })} />
                </FormField>

                <FormField label="Email" id="email"
                    error={errors.email?.message}>
                    <input type="text" id="email" {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value:
                                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                            message: "Invalid email format",
                        },
                        validate: {
                            notGmal: value => value.endsWith("@gmail.com") || "Only Gmail allowed"
                        }
                    })} />
                </FormField>

                <FormField label="Channel" id="channel"
                    error={errors.channel?.message}>
                    <input type="text" id="channel" {...register("channel", {
                        required: {
                            value: true,
                            message: "Channel is required"
                        }
                    })} />
                </FormField>

                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm