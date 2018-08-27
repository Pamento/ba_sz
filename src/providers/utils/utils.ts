declare var navigator: any;
declare var Connection: any;



export function deepcopy(obj: any) {
  return <typeof obj> JSON.parse(JSON.stringify(obj))
}

export function isConnected(){
  return (navigator.connection.type != Connection.NONE);
}