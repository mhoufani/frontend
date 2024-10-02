// Strip all special caracters and spaces from phone number
export const getRawPhoneNumber = phoneNumber => {
  return phoneNumber.toString().replace(/\D/g, '');
};

export const addSpacesInPhoneNumber = phoneNumber => {
  return phoneNumber.replace(
    /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
    '$1 $2 $3 $4 $5'
  );
};

export const removeZerosFromCountryCode = number =>
  number.toString().substring(0, 2) === '00'
    ? number.toString().substring(2)
    : number;

export const getRawPhoneNumberWithoutCountryCode = (
  phoneNumber,
  countryCodeToRemove
) => {
  const rawPhoneNumber = removeZerosFromCountryCode(
    getRawPhoneNumber(phoneNumber)
  );
  return rawPhoneNumber.startsWith(countryCodeToRemove)
    ? rawPhoneNumber.replace(countryCodeToRemove, '0')
    : rawPhoneNumber;
};
