import {DefaultTheme} from '@react-navigation/native';

import colors from './variants/color';

const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.black,
    background: colors.white,
    text: colors.black,
    card: colors.white,
    border: colors.gray.s200,
    notification: colors.black,
  },
};

export default theme;
