export const getMedian = (arr: any[], column: string) => {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid][column] : (arr[mid - 1][column] + arr[mid][column]) / 2;
    }
