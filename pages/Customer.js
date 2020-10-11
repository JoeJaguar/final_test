import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'CustomerDatabase.db' });

const CustomerUser = ({ navigation }) => {
  let [customerName, setCustomerName] = useState('');
  let [customerContact, setCustomerContact] = useState('');
  let [customerAddress, setCustomerAddress] = useState('');

  let customer_user = () => {
    console.log(customerName, customerContact, customerAddress);

    if (!customerName) {
      alert('Please fill name');
      return;
    }
    if (!customerContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!customerAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_customer (customer_name, customer_contact, customer_address) VALUES (?,?,?)',
        [customerName, customerContact, customerAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Registration Failed');
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(customerName) => setCustomerName(customerName)}
                style={{ padding: 10 }}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(customerContact) => setCustomerContact(customerContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{ padding: 10 }}
              />
              
              <Mybutton title="Submit" customClick={customer_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomerUser;