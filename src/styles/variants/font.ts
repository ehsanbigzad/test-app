import {mScale} from 'styles/mixins';

const SIZE_1 = mScale(9.6);
const SIZE_2 = mScale(12);
const SIZE_3 = mScale(14);
const SIZE_4 = mScale(15);
const SIZE_5 = mScale(16);
const SIZE_6 = mScale(18.75);
const SIZE_7 = mScale(23.44);
const SIZE_8 = mScale(29.3);
const SIZE_9 = mScale(36.62);
const SIZE_10 = mScale(45.78);

const fontSize = {
  xs: SIZE_1,
  sm: SIZE_2,
  base: SIZE_3,
  base2: SIZE_4,
  md: SIZE_5,
  lg: SIZE_6,
  lg2: SIZE_7,
  lg3: SIZE_8,
  lg4: SIZE_9,
  lg5: SIZE_10,
};

const font = {
  ...fontSize,
};

export default font;
