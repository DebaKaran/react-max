export interface IYoutubeFormInput {
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
    }[],
    age: number,
    dob: Date
}