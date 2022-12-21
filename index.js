/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import {onBackgroundNotification} from 'utils/notification';

onBackgroundNotification();

AppRegistry.registerComponent(appName, () => App);
