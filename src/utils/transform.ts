// 位置转换列头符号。
//  例如： 1->A 26->Z   27->AA 28->AB
export function indexToChar(number: number): string {
  let res: string = '',
    str: string = number.toString(26);
  for (let i = 0; i < str.length; i++) {
    let char: number = parseInt(str[i], 26);
    if (i !== str.length - 1) {
      char--;
    }
    res += String.fromCharCode(65 + char);
  }
  return res;
}

// 列头符号转换位置。
//  例如： Z->1 Z->26   AA->27 AB->28

function charToIndex(str: string): number {
  let res: string = '';
  for (let i = 0; i < str.length; i++) {
    let char: number = str.charCodeAt(i) - 65;
    if (i < str.length - 1) {
      char++;
    }
    res += char.toString(26);
  }
  return parseInt(res, 26);
}

// 通过单位格标识转换为对应的列与行位置,
// A1=>[0，0],z2=>[26,2]
export function symbolToIndex(str: string): Array<number> {
  let index: number = str.search(/\d/);
  let col: number = charToIndex(str.slice(0, index));
  let row: number = parseInt(str.slice(index)) - 1;
  return [col, row];
}

// 通过对应的列与行位置转换为单元格标识
// [26,2]=>Z2
export function IndexToSymbol(row: number, col: number): string {
  let colSymbol: string = indexToChar(col);
  let rowSymbol: number = row + 1;
  return `${colSymbol}${rowSymbol}`;
}

// 将sheet对象转为Array二维数组
export function objToArray(
  obj: object,
  minRow: number = 30,
  minCol: number = 30,
): string[][] {
  if (!obj['!ref']) return [[]];
  let table = [];
  let [col, row] = symbolToIndex(obj['!ref'].split(':')[1]);
  col = Math.max(col, minCol - 1);
  row = Math.max(row, minRow - 1);
  for (let rowIndex = 0; rowIndex <= row; rowIndex++) {
    if (!table[rowIndex]) {
      table[rowIndex] = [];
    }
    for (let colIndex = 0; colIndex <= col; colIndex++) {
      let key = IndexToSymbol(rowIndex, colIndex);
      table[rowIndex][colIndex] = obj[key] ? obj[key].w : '';
    }
  }
  return table;
}

// 通过行、列位置获取单元格位置
export function getCellIndex(
  rowIndex: number,
  colIndex: number,
  colLength: number,
): number {
  return colIndex + rowIndex * colLength;
}

//数字转px
export function numToPx(number: number): string {
  if (number) {
    return `${number}px`;
  }
}
//px转数字
export function pxToNum(str: string): number {
  if (str) {
    return parseInt(str.slice(0, -2), 10);
  }
}
