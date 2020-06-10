// 位置转换列头符号。
//  例如： 1->A 26->Z   27->AA 28->AB
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
//  例如： 1->A 26->Z   27->AA 28->AB

function charToIndex(str) {
  let res = ''
  for (let item of str) {
    res += (item.charCodeAt() - 65).toString(26)
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

