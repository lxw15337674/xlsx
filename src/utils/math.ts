//两个数字排序
export function sort(array: [number, number]): [number, number] {
    return array.sort((a, b) => {
        return a - b;
    });
}

//数组取和
export function total(array: number[], start: number = 0, end: number = -1): number {
    if (end === -1) {
        end = array.length;
    }
    return array.slice(start, end).reduce((total, item) => total + item, 0);
}
