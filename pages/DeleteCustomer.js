import React, { useState } from 'react';
import { Button, Text, View, Alert, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'CustomerDatabase.db' });

const DeleteCustomer = ({ navigation }) => {
  let [inputCustomerId, setInputCustomerId] = useState('');

  let deleteCustomer = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_customer where customer_id=?',
        [inputCustomerId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Customer deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid Customer Id');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Customer Id"
            onChangeText={(inputUserId) => setInputCustomerId(inputUserId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Delete Customer" customClick={deleteCustomer} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteCustomer;