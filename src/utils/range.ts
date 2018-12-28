export function getRangeValue(start: number, end: number, value: number) {
    if (start > end) {
        return 0;
    }
    if (value < start) {
        return start;
    }
    if (value > end) {
        return end;
    }
    return value;
}
