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
    let content = '';
    for (let row = select.rowStartIndex; row <= select.rowEndIndex; row++) {
        for (let col = select.colStartIndex; col <= select.colEndIndex; col++) {
            content += `${data[row][col]}`;
            if (col !== select.colEndIndex) {
                content += `\t`;
            }
        }
        content += `\n`;
    }
    return content;
}
