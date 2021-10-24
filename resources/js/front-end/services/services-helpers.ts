import { AllowedQueryKeys } from './services.types';

/**
 * Converts an object into a URI compatible query string, which
 * can then be used inside API queries.
 * @param queryObject the object to parse
 * @example
 * ```{name: mochi, surName: labs}```
 * is parsed into ```name=mochi&surName=labs```
 */
// eslint-disable-next-line import/prefer-default-export
export const formatQuery = (queryObject: AllowedQueryKeys) => {
  let result = '';
  Object.keys(queryObject).forEach((key, index, keysList) => {
    const value = queryObject[key as keyof typeof queryObject] as string;
    result += `${key}=${value}`;
    if (index < keysList.length - 1) result += '&';
  });

  return result;
};
