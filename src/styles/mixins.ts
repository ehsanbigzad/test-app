import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

/**
 * Guideline sizes are based on
 * standard ~5" screen mobile device
 */

const baseWidth = 350;
const baseHeight = 680;

function scale(size: number): number {
  return (width / baseWidth) * size;
}

/**
 * Vertical scale
 */
function vScale(size: number): number {
  return (height / baseHeight) * size;
}

/**
 * Moderate scale
 */
function mScale(size: number, factor = 0.1): number {
  return size + (scale(size) - size) * factor;
}

/**
 * Add opacity to a hex color
 */
function withOpacity(hexColor: string, opacity: number): string {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

export {scale, vScale, mScale, withOpacity};
