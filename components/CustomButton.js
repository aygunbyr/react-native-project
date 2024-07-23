import { StyleSheet, Text, Pressable } from 'react-native';
import React from 'react';

const CustomButton = ({
  buttonText,
  setWidth,
  handleOnPress,
  buttonColor,
  buttonColorPressed,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? buttonColorPressed : buttonColor,
          width: setWidth,
        },
        styles.button,
      ]}
      onPress={handleOnPress}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});
