const SensorType = function SensorType(value) {
  this.value = value;
  this.toString = () => (this.value);
};
const sensorTypes = [
  'TEMPERATURE',
  'HUMIDITY',
  'LIGHT',
  'SPEED',
  'FAN_SPEED',
  'LIGHT',
  'SWITCH',
  'DOOR',
  'GATE',
  'POSITIVE_NUMBER',
  'PERCENT',
  'ON_OFF',
  'OPEN_CLOSE',
  'TEXT'
];

for (const key of sensorTypes) {
  SensorType[key] = new SensorType(key);
}

Object.freeze(SensorType);

export default SensorType;
