import React, { useEffect } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'final_testDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_customer'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_customer', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_customer(customer_id INTEGER PRIMARY KEY AUTOINCREMENT, customer_name VARCHAR(20), customer_contact INT(10), customer_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mybutton
            title="Customer"
            customClick={() => navigation.navigate('Customer')}
          />
          <Mybutton
            title="Booking"
            customClick={() => navigation.navigate('Booking')}
          />
          <Mybutton
            title="Staff"
            customClick={() => navigation.navigate('Staff')}
          />
          <Mybutton
            title="Products"
            customClick={() => navigation.navigate('Products')}
          />
          <Mybutton
            title="Delete"
            customClick={() => navigation.navigate('Delete')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;