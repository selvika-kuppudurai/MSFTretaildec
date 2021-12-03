// split files based on extension
export const SplitFiles = (fileData) => {

    if (fileData !== null) {
        let files = fileData.split(",")
        let fileExtensions = files.map(file => file.split('.').pop())
        let ImageFiles = files.filter(file => file.split('.').pop() !== 'pdf')
        let PdfFiles = files.filter(file => file.split('.').pop() === 'pdf')
        return { ImageFiles, PdfFiles, fileExtensions }
    }
}

// Table sort
const compareByAsc = (key) => {
    return function (a, b) {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    };
}

const compareByDesc = (key) => {
    return function (a, b) {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
    };
}

// Table sort
export const TableSort = (tableData, sortKey) => {

    if (tableData.length > 0) {

        let arrayCopy = [...tableData];
        const arrInStr = JSON.stringify(arrayCopy);
        arrayCopy.sort(compareByAsc(sortKey));
        const arrInStr1 = JSON.stringify(arrayCopy);
        if (arrInStr === arrInStr1) {
            arrayCopy.sort(compareByDesc(sortKey));
        }

        return arrayCopy
    }

}