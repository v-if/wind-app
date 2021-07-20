import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ActivityIndicator, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Colors from './Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Feedback({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [toggleCheckBox1, setToggleCheckBox1] = useState(true)
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const responseWrite = (res) => {
    if(res.success) {
      Alert.alert("알림", res.response.msg)
    } else if(res.error) {
      Alert.alert("알림", res.error.message)
    }
  }

  const apiWrite = () => {
    let data = {
      boardTp: toggleCheckBox1 == true ? '문의' : '요청',
      name: name,
      email: email,
      content: content
    };

    setIsLoading(true)
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
    .finally(() => setIsLoading(false));
  }

  function setCheckBox1(newValue) {
    setToggleCheckBox1(newValue)
    if(newValue == false) {
      setToggleCheckBox2(true)
    } else if(newValue == true) {
      setToggleCheckBox2(false)
    }
  }
  function setCheckBox2(newValue) {
    setToggleCheckBox2(newValue)
    if(newValue == false) {
      setToggleCheckBox1(true)
    } else if(newValue == true) {
      setToggleCheckBox1(false)
    }
  }

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View>
        <View style={styles.row}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox1}
            onValueChange={(newValue) => setCheckBox1(newValue)}
          />
          <Text style={styles.checkLabel}>문의하기</Text>
          <CheckBox
            disabled={false}
            value={toggleCheckBox2}
            onValueChange={(newValue) => setCheckBox2(newValue)}
          />
          <Text style={styles.checkLabel}>요청하기</Text>
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
        <View style={styles.contentWrap}>
        <Text style={styles.label}>내용</Text>
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
            onPress={apiWrite} />
        </View>
      </View>
      {isLoading == true ? <ActivityIndicator size="small" color={Colors.black} /> : <View></View>}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: 150,
    color: Colors.black,
  },
  checkbox: {
    alignSelf: "center",
  },
  checkLabel: {
    color: Colors.black,
    textAlign: 'left',
    width: 80,
  },
  label: {
    color: Colors.black,
    textAlign: 'center',
    width: 50,
  },
  input: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    backgroundColor: Colors.lighter,
  },
  contentWrap: {
    flexDirection: 'column',
    margin: 10,
  },
  inputMultiline: {
    height: 160,
    flex: 1,
    marginTop: 10,
    backgroundColor: Colors.lighter,
    borderWidth: 1,
    textAlignVertical: 'top',
  },
});