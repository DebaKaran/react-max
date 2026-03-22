// trims whitespace
export const trim = (value: string) => value?.trim();

// trims + lowercase (for email)
export const trimToLowercase = (value: string) => value?.trim().toLowerCase();

// trims + remove leading @ (for twitter)
export const normalizeTwitter = (value: string) => value?.trim().replace(/^@/, "");

// trims + digits only (for phone)
export const normalizePhone = (value: string) =>
    value?.replace(/\D/g, "");