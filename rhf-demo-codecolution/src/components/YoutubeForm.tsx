import { useForm } from "react-hook-form";

interface IYoutubeFormInput {
    username: string;
    email: string;
    channel: string
}
const YoutubeForm = () => {
    const form = useForm<IYoutubeFormInput>();
    const { register } = form;
    const { name, ref, onChange, onBlur } = register("username");

    return (
        <div>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name={name} ref={ref} onChange={onChange} onBlur={onBlur} />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel" name="channel" />

                <button>Submit</button>
            </form>
        </div>
    )
}

export default YoutubeForm