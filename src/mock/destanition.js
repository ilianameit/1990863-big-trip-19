const destanition = [

];
function returnDestanition(city){
  const destanitionCity = destanition.filter((item) => item.id === city || item.name === city);
  return destanitionCity[0];
}
function returnAllDestanitions() {
  const allDestanitions = destanition.map(({name}) => name);
  return allDestanitions;
}

export {destanition, returnDestanition, returnAllDestanitions};
