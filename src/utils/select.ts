interface select {
    rowStartIndex: number;
    colStartIndex: number;
    rowEndIndex: number;
    colEndIndex: number;
}
export function isSelected(rowIndex, colIndex, select): boolean {
    return (
        select.rowStartIndex <= rowIndex &&
        rowIndex <= select.rowEndIndex &&
        select.colStartIndex <= colIndex &&
        colIndex <= select.colEndIndex
    );
}
