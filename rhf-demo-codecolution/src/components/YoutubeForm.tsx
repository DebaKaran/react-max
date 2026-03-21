import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
interface IYoutubeFormInput {
    username: string;
    email: string;
    channel: string
}
const YoutubeForm = () => {
    const form = useForm<IYoutubeFormInput>();
    const { register, control, handleSubmit } = form;

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

                <label htmlFor="email">Email</label>
                <input type="text" id="email" {...register("email", {
                    pattern: {
                        value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email format",
                    },
                })} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" {...register("channel", {
                    required: {
                        value: true,
                        message: "Channel is required"
                    }
                })} />

                <button>Submit</button>
            </form>
            {import.meta.env.DEV && <DevTool control={control} />} {/* set up the dev tool */}
        </div>
    )
}

export default YoutubeForm