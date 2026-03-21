export const validationRules = {
    username: {
        required: {
            value: true,
            message: "Username is required"
        },
        validate: (value: string) => {
            if (value.length < 3) return "Minimum 3 characters";
            if (value === "admin") return "Username 'admin' is not allowed";
            return true;
        }
    },
    email: {
        required: "Email is required",
        pattern: {
            value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Invalid email format",
        },
        validate: {
            notGmal: (value: string) => value.endsWith("@gmail.com") || "Only Gmail allowed"
        }
    },
    channel: {
        required: {
            value: true,
            message: "Channel is required"
        }
    }
}