import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';

const WS_URL = 'wss://extremenet-dev.ru:8470/websocket/api';
//var ws = React.useRef(new WebSocket('ws://w567l.sse.codesandbox.io/')).current;
//const ws = new WebSocket('ws://extremenet-dev.ru:8087/websocket');
//const ws = new WebSocket('ws://extremenet-dev.ru:15374/websocket/api');
let ws = null;
//const ws = new WebSocket('ws://localhost:17592/websocket/api');
console.log('NEW SIMPLE WEBSOCKET ========');

export default function App() {
  const [serverState, setServerState] = React.useState('Loading...');
  const [messageText, setMessageText] = React.useState('');
  const [disableButton, setDisableButton] = React.useState(true);
  const [inputFieldEmpty, setInputFieldEmpty] = React.useState(true);
  const [serverMessages, setServerMessages] = React.useState([]);

  React.useEffect(() => {
   /* const serverMessagesList = [];
    ws.onopen = () => {
      console.log('TORBA!!!!!!!!!!!!!!!');
      setServerState('Connected to the server');
      setDisableButton(false);
      serverMessagesList.push('Connected to the server');
      setServerMessages([...serverMessagesList]);
    };
    ws.onclose = e => {
      setServerState('Disconnected. Check internet or server.');
      setDisableButton(true);
      ws = null;
    };
    ws.onerror = e => {
      setServerState(e.message);
    };
    ws.onmessage = e => {
      serverMessagesList.push(e.data);
      setServerMessages([...serverMessagesList]);
    };*/
  }, []);
  const submitMessage = () => {
    ws.send('SUBSCRIBE:' + messageText);
    setMessageText('');
    setInputFieldEmpty(true);
  };
  const connectNewSocket = () => {
    console.log('connectNewSocket');
    if (ws == null) {
      console.log('new WebSocket(WS_URL)');
      ws = new WebSocket(WS_URL);
        const serverMessagesList = [];
        ws.onopen = () => {
            console.log('TORBA!!!!!!!!!!!!!!!');
            setServerState('Connected to the server');
            setDisableButton(false);
            serverMessagesList.push('Connected to the server');
            setServerMessages([...serverMessagesList]);
        };
        ws.onclose = e => {
            setServerState('Disconnected. Check internet or server.');
            setDisableButton(true);
            ws = null;
        };
        ws.onerror = e => {
            setServerState(e.message);
        };
        ws.onmessage = e => {
            serverMessagesList.push(e.data);
            setServerMessages([...serverMessagesList]);
        };
    }
  };
  const disconnectSocket = () => {
    console.log('disconnectSocket');
    if (ws != null) {
      console.log('ws.close()');
      ws.close();
      // ws = null;
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 30,
          backgroundColor: '#eeceff',
          padding: 5,
        }}>
        <Text>{serverState}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#ffeece',
          padding: 5,
          flexGrow: 1,
        }}>
        <ScrollView>
          {serverMessages.map((item, ind) => {
            return <Text key={ind}>{item}</Text>;
          })}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Button onPress={connectNewSocket} title={'Connect'} />
        <Button onPress={disconnectSocket} title={'Disconnect'} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'black',
            flexGrow: 1,
            padding: 5,
          }}
          placeholder={'Add Message'}
          onChangeText={text => {
            setMessageText(text);
            setInputFieldEmpty(text.length > 0 ? false : true);
          }}
          value={messageText}
        />
        <Button
          onPress={submitMessage}
          title={'Submit'}
          disabled={disableButton || inputFieldEmpty}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: 30,
    padding: 8,
  },
});
