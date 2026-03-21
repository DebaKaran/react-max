import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
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
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {

                    required: {
                        value: true,
                        message: "Username is required"
                    }
                })} />
                {errors.username && <p className="error">{errors.username.message}</p>}
                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register("email", {
                    required: "Email is required",
                    pattern: {
                        value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                    },
                })} />
                {errors.email && <p className="error">{errors.email.message}</p>}
                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: {
                        value: true,
                        message: "Channel is required"
                    }
                })} />
                {errors.channel && <p className="error">{errors.channel.message}</p>}
                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm