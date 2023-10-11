import * as XLSX from 'xlsx';
import dotenv from "dotenv";

dotenv.config();

export default function getListProfileIds(): string[] {
    return readExcelFile(process.env.EXCEL_FILE);
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