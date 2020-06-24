export  function sheetFilter(sheet:object):object {
  let res = {};
  for (let key in sheet) {
    if (/^[A-Z]+[0-9]+$/.test(key)) {
      res[key] = sheet[key].v;
    }
  }
  return res;
}

export  function sheetsFilter(sheets:object):object {
  let res = {}
  for (let sheetName in sheets) {
    res[sheetName] = sheetFilter(sheets[sheetName]);
  }
  return res
}
