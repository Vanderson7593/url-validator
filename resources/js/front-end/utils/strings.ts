export const capitalizeFirstLetter = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
export const unCapitalizeFirstLetter = (x: string) => x.charAt(0).toLowerCase() + x.slice(1);
export const formatYupRefError = (x?: string) =>
  x?.indexOf(':') !== -1 ? x?.split(':')[1]?.split(',')[0]?.trim() : x;
