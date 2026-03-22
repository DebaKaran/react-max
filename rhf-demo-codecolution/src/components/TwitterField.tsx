import { useWatch } from "react-hook-form";
import type { TwitterFieldProps } from "../typed/TwitterFieldProps"
import FormField from "./FormField";
import { normalizeTwitter } from "../transformation/transform";

const TwitterField = ({ control, register, errors }: TwitterFieldProps) => {

    const facebook = useWatch({
        name: "social.facebook",
        control
    });

    if (!facebook) return null;
    return (
        <FormField label="Twitter" id="twitter"
            error={errors.social?.twitter?.message}>
            <input type="text" id="twitter" {...register("social.twitter", {
                //...validationRules.twitter,
                setValueAs: normalizeTwitter
            })} />
        </FormField>
    )
}

export default TwitterField