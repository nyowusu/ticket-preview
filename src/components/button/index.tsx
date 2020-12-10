import React, {ReactElement} from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import {Button} from 'react-native-elements';

import {
  white,
  purple,
  grey,
  brown,
  brownLight,
  brownPrimary,
  lightBlue,
} from '../../constants/colors';
import {OpenSansSemiBold, OpenSansBold} from '../../constants/fonts';

interface Props {
  title: string;
  variant:
    | 'default'
    | 'rounded-brown'
    | 'rounded-light-brown'
    | 'rounded-light-blue'
    | 'squared-light-blue'
    | 'clear';
  onPress: () => void;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  width?: string | number;
  rippleColor?: string;
  testID?: string;
  icon?: any;
  children?: ReactElement;
}

export default function Touchable({
  width = '100%',
  loading = false,
  disabled = false,
  variant = 'default',
  rippleColor = white,
  containerStyle = {},
  titleStyle = {},
  buttonStyle = {},
  disabledStyle = {},
  title,
  children,
  ...restOfProps
}: Props) {
  let customContainerStyle: StyleProp<ViewStyle> = styles.buttonContainer;
  let customTitleStyle: StyleProp<TextStyle> = styles.buttonText;
  let customButtonStyle: StyleProp<ViewStyle> = styles.button;

  let props = restOfProps;

  if (variant === 'rounded-brown') {
    customContainerStyle = styles.submitButtonContainer;
    customTitleStyle = styles.submitButtonText;
    customButtonStyle = styles.submitButton;
  }

  if (variant === 'rounded-light-brown') {
    customContainerStyle = styles.lightBrownSubmitButtonContainer;
    customTitleStyle = styles.submitButtonText;
    customButtonStyle = styles.lightBrownSubmitButton;
  }

  if (variant === 'rounded-light-blue' || variant === 'squared-light-blue') {
    customContainerStyle = styles.lightBlueSubmitButtonContainer;
    customTitleStyle = styles.submitButtonText;
    customButtonStyle =
      variant === 'rounded-light-blue'
        ? styles.lightBlueSubmitButton
        : styles.lightBlueSquaredSubmitButton;
  }

  if (variant === 'clear') {
    props = {...props, ...{type: 'clear'}};
    customContainerStyle = styles.clearButtonContainer;
    customTitleStyle = styles.clearButtonText;
    customButtonStyle = styles.clearButton;
  }

  return (
    <Button
      {...props}
      title={title}
      containerStyle={[customContainerStyle, {width}, containerStyle]}
      titleStyle={[customTitleStyle, titleStyle]}
      buttonStyle={[customButtonStyle, buttonStyle]}
      disabledStyle={[styles.buttonDisabled, disabledStyle]}
      disabled={disabled || loading}
      loading={loading}
      loadingProps={{
        size: 'large',
        color: white,
      }}
      background={TouchableNativeFeedback.Ripple(rippleColor)}>
      {children}
    </Button>
  );
}

const shareRoundedButtonStyles = {
  borderRadius: 50,
  borderWidth: 2,
  height: 45,
  elevation: 2,
};

const styles = StyleSheet.create({
  buttonContainer: {},
  button: {
    backgroundColor: purple,
    borderColor: grey,
    ...shareRoundedButtonStyles,
  },
  buttonText: {
    fontFamily: OpenSansSemiBold,
    color: white,
    fontSize: 16,
  },

  submitButtonContainer: {},
  submitButton: {
    backgroundColor: brown,
    borderColor: brownLight,
    ...shareRoundedButtonStyles,
  },
  submitButtonText: {
    fontFamily: OpenSansBold,
    color: white,
    fontSize: 14,
  },

  lightBrownSubmitButtonContainer: {},
  lightBrownSubmitButton: {
    backgroundColor: brownLight,
    borderColor: brown,
    ...shareRoundedButtonStyles,
  },

  lightBlueSubmitButtonContainer: {},
  lightBlueSubmitButton: {
    backgroundColor: lightBlue,
    borderColor: grey,
    ...shareRoundedButtonStyles,
  },
  lightBlueSquaredSubmitButton: {
    backgroundColor: lightBlue,
    borderColor: lightBlue,
    ...shareRoundedButtonStyles,
    borderRadius: 0,
  },

  clearButtonContainer: {},
  clearButtonText: {
    fontFamily: OpenSansBold,
    color: brownPrimary,
    fontSize: 14,
    lineHeight: 30,
  },
  clearButton: {
    margin: 0,
    padding: 0,
  },

  buttonDisabled: {
    backgroundColor: grey,
    borderColor: grey,
    shadowColor: grey,
  },
});
