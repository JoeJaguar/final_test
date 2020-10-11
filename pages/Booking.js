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

const Booking = ({ navigation }) => {
  let [inputCustomeId, setInputCustomerId] = useState('');
  let [customeName, setCustomerName] = useState('');
  let [customeContact, setCustomerContact] = useState('');
  

  let updateAllStates = (name, contact, address) => {
    setCustomerName(name);
    setCustomerContact(contact);
    setCustomerAddress(address);
  };

  let searchCustomer = () => {
    console.log(inputCustomeId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_custome where custome_id = ?',
        [inputCustomeId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.custome_name, res.custome_contact);
          } else {
            alert('No custome found');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateCustomer = () => {
    console.log(inputcustomerId, customerName, customerContact);

    if (!inputcustomerId) {
      alert('Please fill Customer id');
      return;
    }
    if (!customerName) {
      alert('Please fill name');
      return;
    }
    if (!customerContact) {
      alert('Please fill Contact Number');
      return;
    }
    
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        [customerName, customerContact, inputcustomerId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Customer updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Updation Failed');
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
                placeholder="Enter Custome Id"
                style={{ padding: 10 }}
                onChangeText={(inputCustomeId) => setInputCustomerId(inputCustomeId)}
              />
              <Mybutton title="Search Customer" customClick={searchCustome} />
              <Mytextinput
                placeholder="Enter Name"
                value={customerName}
                style={{ padding: 10 }}
                onChangeText={(customerName) => setCustomerName(customerName)}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                value={'' + customerContact}
                onChangeText={(customerContact) => setCustomerContact(customeContact)}
                maxLength={10}
                style={{ padding: 10 }}
                keyboardType="numeric"
              />
              
              <Mybutton title="Booking" customClick={updateBooking} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Booking;