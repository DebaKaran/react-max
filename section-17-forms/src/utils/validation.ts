export const isEmail = (email: string): boolean => {
    return email.includes('@');
}

export const isNotEmty = (value: string): boolean => {
    return value.trim() !== '';
}

export const hasMinimunLength = (value: string, minLength: number): boolean => {
    return value.length >= minLength;
}

export const isEqualsToOtherValue = (value: string, otherValue: string): boolean => {
    return value === otherValue;
}