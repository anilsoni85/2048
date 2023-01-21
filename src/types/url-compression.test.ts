import { compress, decompress } from "./url-compression";

it ('should compress and decompress state', () => {
  const obj  : number[][] = [
    [4096, 2048, 1024, 512], 
    [256, 128, 64, 32], 
    [16, 8, 4, 2], 
    [8192, 0, 0, ]];
  
  const compressedText = compress(obj);

  console.log(compressedText);

  const obj2 = decompress<number[][]>(compressedText);

  expect(obj2).toEqual(obj);
});