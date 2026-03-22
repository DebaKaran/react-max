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
    },
    /**facebook: {
        required: "Facebook profile is required",
        pattern: {
            value: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?$|^[A-Za-z0-9.]+$/,
            message: "Enter a valid Facebook URL or username"
        }
    },

    twitter: {
        required: "Twitter handle is required",
        pattern: {
            value: /^(https?:\/\/)?(www\.)?(twitter\.com)\/@?[A-Za-z0-9_]{1,15}\/?$|^@?[A-Za-z0-9_]{1,15}$/,
            message: "Enter a valid Twitter URL or handle"
        }
    },*/
    phone: {
        pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Enter valid 10-digit Indian phone number"
        }
    },

    age: {
        required: "Age is required",
        min: {
            value: 18,
            message: "Minimum age is 18"
        },
        max: {
            value: 99,
            message: "Maximum age is 99"
        }
    },

    dob: {
        required: "Date of Birth is required"
    }
}