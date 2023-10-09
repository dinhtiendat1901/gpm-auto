import * as XLSX from 'xlsx';

const apiUrl = 'http://127.0.0.1:19995';


export default function getListProfileIds(): string[] {
    const filePath = './profileid.xlsx';
    return readExcelFile(filePath);

}


const readExcelFile = (filePath: string): string[] => {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming you want the first sheet
    const worksheet = workbook.Sheets[sheetName];

    const firstColumnData: string[] = [];
    let rowNum = 1; // Start at 1 to skip the header row

    while (true) {
        const cellAddress = `A${rowNum}`; // "A" refers to the first column
        const cell = worksheet[cellAddress];

        if (!cell) {
            break; // Stop when you hit a null cell
        }

        firstColumnData.push(cell.v as string); // Assuming the cell contains text
        rowNum++;
    }

    return firstColumnData;
};