import React from 'react';
import { StyleSheet,View,Text,FlatList } from 'react-native';
import Mybutton from './components/Mybutton';

export default class ViewAll extends React.Component {

  state={
    data:[]
  }

  fetchData= async()=>{
    const response = await fetch('http://10.10.10.111:3001/tbl_study'); //http://localhost:1348/testTabl //http://172.16.186.173:1348/testTabl
    const testTable = await response.json();
    this.setState({data: testTable});
  }
  componentWillMount(){
    this.fetchData();
}

  render() {
    return (
      <View style={styles.container}>
            
      <FlatList
        data={this.state.data}
        keyExtractor= {(item,index) => index.toString()}
        renderItem={({item})=>

        <View style={{backgroundColor:'#EEB4B4',padding:10,margin:10,borderRadius:10}}>
          <Text style={{color:'#fff', fontWeight:'bold'}}>
            <Text style={{color:'#000000'}}>รหัสลูกค้า: {item.ID}</Text>{'\t'}ชื่อลูกค้า: {item.Name}</Text>
          
          <Text style={{color:'#fff'}}>โทร: {item.Telephone}</Text>
          <Text style={{color:'#fff'}}>เพศ: {item.Sex}</Text>
        </View>

        } 
      />
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#F5FCFF',
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

});