import mqtt from 'mqtt'

let client = null;


const SensorClient  = {
  connectedCallback: console.log,
  disconnectedCallback: console.log,
  dataCallback: console.log
}


const onConnect = () => {
  SensorClient.connectedCallback();
  client.subscribe("value/#");
}

const onConnectionLost = (responseObject) => {
  let msg;
  if (responseObject.errorCode !== 0) {
    msg = responseObject.errorMessage
  }
  SensorClient.disconnectedCallback(msg)
}

const onMessageArrived = (topic, message) => {
  SensorClient.dataCallback({topic:topic, payload:JSON.parse(message.toString())});
}


SensorClient.connect =  (url= 'ws://172.18.0.1:8080') => {
  if(client != null) {
    client.end(true);
  }
  client = mqtt.connect(url)
  client.on('message',onMessageArrived)
  client.on('connect',onConnect);
  client.on('close',onConnectionLost);
}

SensorClient.disconnect = () => {
  return new Promise((resolve, reject)=> {
    if(client != null) {
      client.end(true, () => {client = null; resolve();});
    }
    else
      resolve()
  })
}


export default SensorClient
