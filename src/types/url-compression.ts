import base64url from 'base64url';

export function compress(obj : object) : string {
  const jsonString = JSON.stringify(obj);
  //const compressedData = gzip(jsonString);
  const encodedData = base64url.encode(jsonString);
  return encodedData;
}

export function  decompress<T>(data : string) {
  const jsonString = base64url.decode(data);
  //const decompressedData = ungzip(Buffer.from(decodedData, 'base64'));
  //const jsonString = new TextDecoder().decode(decompressedData);
  const obj = JSON.parse(jsonString);
  const objT = obj as T;
  return objT;
}



