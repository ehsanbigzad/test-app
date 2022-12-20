import React, {useCallback} from 'react';
import RNBootSplash from 'react-native-bootsplash';

import RootNavigator from 'navigator';

export default function App() {
  /**
   * Hide splash screen
   */
  const onReady = useCallback(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return <RootNavigator onReady={onReady} />;
}
