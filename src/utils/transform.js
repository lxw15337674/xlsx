// 位置转换列头符号。
//  例如： 1->A 26->Z   27->AA 28->AB
import { sheetFilter } from './sheetFilter';

export function indexToChar(number) {
  let res = '';
  number = number.toString(26);
  for (let i = 0; i < number.length; i++) {
    let char = number[i];
    if (i !== number.length - 1) {
      char--;
    }
    char = parseInt(char, 26);
    res += String.fromCharCode(65 + char);
  }
  return res;
}

// 列头符号转换位置。
//  例如： Z->1 Z->26   AA->27 AB->28

function charToIndex(str) {
  let res = ''
  for (let i = 0; i < str.length; i++) {
    let char =  str.charCodeAt(i) - 65
    if(i<str.length-1){
      char++
    }
    res += char.toString(26)
  }
  return parseInt(res, 26);
}




// 通过单位格标识转换为对应的列与行位置,
// A1=>[0，0],z2=>[26,2]
export function symbolToIndex(str) {
  let index = str.search(/\d/)
  let col = charToIndex(str.slice(0, index), 26)
  let row = parseInt(str.slice(index))-1
  return [col, row]
}

// 通过对应的列与行位置转换为单元格标识
// [26,2]=>Z2
export function IndexToSymbol(row, col) {
  let colSymbol = indexToChar(col)
  let rowSymbol = row + 1
  return `${colSymbol}${rowSymbol}`
}

// 将sheet对象转为Array二维数组
export function objToArray(obj){
  let table = [];
  let [row, col] = symbolToIndex(obj['!ref'].split(':')[1]);
  for(let rowIndex=0;rowIndex<=row;rowIndex++){
    if(!table[rowIndex]){
      table[rowIndex]=[]
    }
    for(let colIndex=0;colIndex<=col;colIndex++){
      let key = IndexToSymbol(rowIndex,colIndex)
      table[rowIndex][colIndex]=obj[key]?obj[key].v:''
    }
  }
  return table;
}

