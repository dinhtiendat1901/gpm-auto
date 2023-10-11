import * as ExcelJS from 'exceljs';
import dotenv from "dotenv";

dotenv.config();

export default async function getListProfileIds(): Promise<string[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);
    const worksheet = workbook.worksheets[0];
    const firstColumnData: string[] = [];
    worksheet.eachRow({includeEmpty: false}, (row) => {
        const cellValue = row.getCell(1).value;
        if (cellValue !== null && typeof cellValue !== 'undefined') {
            firstColumnData.push(String(cellValue));
        }
    });
    return firstColumnData;
}