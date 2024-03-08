
export const generateUniqueId = () =>
    '_' + Math.random().toString(36).substr(2, 9);

export function isValidDateFormat(dateString) {
    // Regular expression to match the format M/D/YYYY
    const dateFormatRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

    // Test the date string against the regular expression
    return dateFormatRegex.test(dateString);
}


