import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#40F9BB',
    color: '#000000',
    padding: 10,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    fontWeight: 'bold',
  },
  text: {
    color: '#000000',
  },
});

export default Mybutton;