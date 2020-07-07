interface selectedIndex {
    rowStartIndex: number;
    colStartIndex: number;
    rowEndIndex: number;
    colEndIndex: number;
}
export function isSelected(rowIndex: number, colIndex: number, select: selectedIndex): boolean {
    return (
        select.rowStartIndex <= rowIndex &&
        rowIndex <= select.rowEndIndex &&
        select.colStartIndex <= colIndex &&
        colIndex <= select.colEndIndex
    );
}
export function getSelectedList(data: string[][], select: selectedIndex) {
    let array = [];
    for (let row = select.rowStartIndex; row <= select.rowEndIndex; row++) {
        for (let col = select.colStartIndex; col <= select.colEndIndex; col++) {
            array.push(data[row][col]);
        }
    }
    return array;
}
