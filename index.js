/**
 * @format
 */
import {Navigation} from 'react-native-navigation';

// import {AppRegistry} from 'react-native';
import App from './App';
import {darkBlue} from './src/constants/colors';
// import {name as appName} from './app.json';
// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponent('appScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'appScreen',
              options: {
                topBar: {
                  title: {
                    text: 'Home',
                    color: 'white',
                  },
                  background: {
                    color: darkBlue,
                  },
                },
              },
            },
          },
        ],
      },
    },
  });
});
