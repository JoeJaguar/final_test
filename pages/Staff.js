import React, { useState } from 'react';
import { Text, View, Button, SafeAreaView } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'StaffDatabase.db' });

const Staff = () => {
  let [inputStaffId, setInputStaffId] = useState('');
  let [staffData, setStaffData] = useState({});

  let searchStaff = () => {
    console.log(inputStaffId);
    setStaffData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM staff_user where staff_id = ?',
        [inputStaffId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setStaffData(results.rows.item(0));
          } else {
            alert('No Staff found');
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
            placeholder="Enter Staff Id"
            onChangeText={(inputStaffId) => setInputStaffId(inputStaffId)}
            style={{ padding: 10 }}
          />
          <Mybutton title="Search Staff" customClick={searchStaff} />
          <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
            <Text>Staff Id: {staffData.staff_id}</Text>
            <Text>Staff Name: {staffData.staff_name}</Text>
            <Text>Staff Contact: {staffData.Staff_contact}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Staff;