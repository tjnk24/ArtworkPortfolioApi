export function calcDimensions(arr) {
    return arr.map(dimension => {
        return parseInt(dimension.toString().substring(0, 2), 10);
    });
}