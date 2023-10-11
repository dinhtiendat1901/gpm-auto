import ExcelJS, {CellValue} from 'exceljs';
import dotenv from "dotenv";

dotenv.config();

async function deleteFirstRow(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);
    const worksheet = workbook.worksheets[0];
    worksheet.spliceRows(0, 1);
    await workbook.xlsx.writeFile(process.env.EXCEL_FILE);
}


async function cutAndInsertRow(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);

    const firstWorksheet = workbook.worksheets[0];
    const secondWorksheet = workbook.worksheets[1] || workbook.addWorksheet('Sheet2');

    const firstRow = firstWorksheet.getRow(1);
    const rowToCut: CellValue[] = [];

    // Manually collecting the row's cell values
    firstRow.eachCell({includeEmpty: true}, (cell, colNumber) => {
        rowToCut[colNumber - 1] = cell.value;  // colNumber is 1-based
    });

    // Delete the row from the first worksheet
    firstWorksheet.spliceRows(1, 1);

    // Insert the row into the first row of the second worksheet
    secondWorksheet.spliceRows(1, 0, rowToCut);

    await workbook.xlsx.writeFile(process.env.EXCEL_FILE);
}


export {deleteFirstRow, cutAndInsertRow}