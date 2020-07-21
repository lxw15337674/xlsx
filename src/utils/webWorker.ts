import SWorker from 'simple-web-worker';

import { findVisibleIndex } from '@/utils/scroll';

let worker;
export default class Worker {
    public actions = [
        { message: 'findVisibleIndex', func: findVisibleIndex },
        {
            message: 'sheetInit',
            func: (rowsLength = 100, colsLength = 100) => {
                let table = [];
                for (let row = 0; row < rowsLength; row++) {
                    table[row] = [];
                    for (let col = 0; col < colsLength; col++) {
                        table[row][col] = `行：${row}，列：${col}`;
                    }
                }
                return table;
            },
        },
    ];

    constructor() {
        if (!worker) {
            worker = SWorker.create(this.actions);
        }
        return worker;
    }
}
