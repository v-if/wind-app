import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from './Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Feedback({ navigation }) {
  const [value, setValue] = React.useState('문의');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  const responseWrite = (res) => {
    if(res.success) {
      alert(res.response.msg)
    } else if(res.error) {
      alert(res.error.message)
    }
  }

  const apiWrite = () => {
    let data = {
      boardTp: value,
      name: name,
      email: email,
      content: content
    };

    fetch('http://118.67.129.162/api/board/write', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => response.json())
    .then((json) => responseWrite(json))
    .catch((error) => console.error(error))
    .finally(() => console.log('finally'));
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View style={styles.row}>
          <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
            <View style={styles.row}>
              <Text>문의하기</Text>
              <RadioButton value="문의" />
              <Text>요청하기</Text>
              <RadioButton value="요청" />
            </View>
          </RadioButton.Group>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>이름</Text>
          <TextInput 
            style={styles.input}
            onChangeText={text => setName(text)}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>연락처</Text>
          <TextInput 
            style={styles.input}
            onChangeText={text => setEmail(text)}
          ></TextInput>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.inputMultiline}
            multiline
            numberOfLines={8}
            onChangeText={text => setContent(text)}
          />
        </View>
        <View style={styles.row}>
          <Button
            title="Send"
            onPress={apiWrite}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  picker: {
    height: 40,
    width: 150,
    color: Colors.black,
  },
  label: {
    color: Colors.black,
    textAlign: 'center',
    width: 50,
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: Colors.peter_river,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
  inputMultiline: {
    height: 160,
    flex: 1,
    borderColor: Colors.peter_river,
    backgroundColor: Colors.white,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});