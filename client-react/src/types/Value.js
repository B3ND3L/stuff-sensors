const Value = function Value(value) {
  this.value = value;
  this.toString = () => (this.value);
};
const values = [
  'ON',
  'OFF',
  'OPEN',
  'CLOSE',
];
for (const key of values) {
  Value[key] = new Value(key);
}
Object.freeze(Value);

export default Value
