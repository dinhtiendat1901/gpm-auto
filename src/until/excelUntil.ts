import ExcelJS from 'exceljs';
import dotenv from "dotenv";

dotenv.config();

async function deleteFirstRow(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);
    const worksheet = workbook.worksheets[0];
    worksheet.spliceRows(0, 1);
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

const writeToSecondSheet = async (num: number, text: string) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(process.env.EXCEL_FILE);  // Replace 'your-file.xlsx' with the actual file name

    // Assuming the second worksheet exists
    const worksheet = workbook.getWorksheet(2);
    if (!worksheet) {
        throw new Error('Second worksheet does not exist');
    }

    // Find the last row with data in it
    let lastRow = worksheet.lastRow;
    let newRowNumber = 1;
    if (lastRow && lastRow.number) {
        newRowNumber = lastRow.number + 1;
    }

    // Create new row and add data
    const newRow = worksheet.getRow(newRowNumber);
    newRow.getCell(1).value = num;
    newRow.getCell(2).value = text;
    newRow.commit();

    // Save changes to workbook
    await workbook.xlsx.writeFile(process.env.EXCEL_FILE);  // Replace 'your-file.xlsx' with the actual file name
};


export {deleteFirstRow, readData, writeArrayToColumn, clearSecondWorksheet, writeToSecondSheet}