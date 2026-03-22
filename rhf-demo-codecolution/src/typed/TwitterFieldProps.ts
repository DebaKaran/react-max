import type { Control, FieldErrors, UseFormRegister } from "react-hook-form"
import type { IYoutubeFormInput } from "./IYoutubeFormInput"

export type TwitterFieldProps = {
    control: Control<IYoutubeFormInput>;
    register: UseFormRegister<IYoutubeFormInput>;
    errors: FieldErrors<IYoutubeFormInput>
}