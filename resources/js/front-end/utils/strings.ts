export const capitalizeFirstLetter = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
export const removeFirstLastChar = (x: string) => x.replaceAll('"', '')