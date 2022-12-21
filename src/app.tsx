import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import RootNavigator from 'navigator';
import useMessaging from 'hooks/message';

export default function App() {
  /**
   * Listen to the
   * remote push notification
   */
  useMessaging();

  /**
   * Hide splash screen
   */
  const onReady = useCallback(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return <RootNavigator onReady={onReady} />;
}
