// Strip all special characters and spaces from phone number
export const getRawPhoneNumber = (phoneNumber: string | number) => {
  return phoneNumber.toString().replace(/\D/g, '');
};

export const addSpacesInPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(
    /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
    '$1 $2 $3 $4 $5'
  );
};

export const removeZerosFromCountryCode = (number: number | string): string =>
  number.toString().substring(0, 2) === '00'
    ? number.toString().substring(2)
    : number.toString();

export const  getRawPhoneNumberWithoutCountryCode = (
  phoneNumber: string,
  countryCodeToRemove = ''
) => {
  const rawPhoneNumber = removeZerosFromCountryCode(
    getRawPhoneNumber(phoneNumber)
  );
  return rawPhoneNumber.startsWith(countryCodeToRemove)
    ? rawPhoneNumber.replace(countryCodeToRemove, '0')
    : rawPhoneNumber;
};
