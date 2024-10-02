import {
  addLeadingDotToFileExtension,
  addTrailingSlashToPath,
} from 'util-common/url';

export const getRandomImg = ({
  imageBaseUrl = '',
  imageFileExtension = '.webp',
  imageFilePrefix = '',
  imageFileVariants = [],
}) => {
  if (!imageFileVariants.length) {
    return null;
  }
  const randomIndex = Math.floor(
    Math.random() * imageFileVariants.length
  );
  return `${addTrailingSlashToPath(imageBaseUrl)}${imageFilePrefix}${
    imageFileVariants[randomIndex]
  }${addLeadingDotToFileExtension(imageFileExtension)}`;
};
