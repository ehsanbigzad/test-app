import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type MainStackParamList = {
  Home: undefined;
  Photo: undefined;
  Memo: undefined;
  Calculator: undefined;
};

export type ScreenParamList = AuthStackParamList & MainStackParamList;

/**
 * Screen props
 */

type ScreenProps = NativeStackScreenProps<ScreenParamList>;

type ScreenPropOf<T extends keyof ScreenParamList> = NativeStackScreenProps<
  ScreenParamList,
  T
>;

/**
 * Specifying default types for useNavigation, Link, ref etc​.
 */

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ScreenParamList {}
  }
}
