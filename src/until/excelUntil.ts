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

async function readData(): Promise<string[]> {
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


const writeArrayToColumn = async (data: string[]): Promise<void> => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);

    const worksheet = workbook.worksheets[0];

    // Write the array of strings to the first column
    for (let i = 0; i < data.length; i++) {
        const rowIndex = i + 1;  // Row indices in Excel are 1-based
        const cell = worksheet.getCell(`A${rowIndex}`);
        cell.value = data[i];
    }

    await workbook.xlsx.writeFile(process.env.EXCEL_FILE);
};

const clearSecondWorksheet = async (): Promise<void> => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);

    // Check if a second worksheet exists
    if (workbook.worksheets.length > 1) {
        const secondWorksheet = workbook.worksheets[1];

        // Remove the second worksheet
        workbook.removeWorksheet(secondWorksheet.id);

        // Add it back
        workbook.addWorksheet('Sheet2');

        await workbook.xlsx.writeFile(process.env.EXCEL_FILE);
    } else {
        console.log('The second worksheet does not exist.');
    }
};


export {deleteFirstRow, cutAndInsertRow, readData, writeArrayToColumn, clearSecondWorksheet}