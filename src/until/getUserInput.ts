import * as readline from 'readline';


interface userInput {
    runType: number,
    runFrom: number,
    runTo: number,
    runScript: number
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Wrapping rl.question in a promise to make it compatible with async/await
const question = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(prompt, (answer: string) => {
            resolve(answer);
        });
    });
};


export default async function (): Promise<userInput> {
    let from = '0';
    let to = '0';
    console.log('Lấy profileId ở đâu:\n' +
        '1.Từ excel\n' +
        '2.Nhập tay');
    const runType = await question('Chọn:');
    console.log('');
    if (runType === '2') {
        from = await question('Chạy từ profile số:');
        to = await question('Đến profile số:');
        console.log('');
    }
    console.log('Chọn kịch bản:\n' +
        '1.Tạo ví metamask\n' +
        '2.Link alphabot')
    const runScript = await question('Chọn:');
    return {
        runType: parseInt(runType),
        runFrom: parseInt(from),
        runTo: parseInt(to),
        runScript: parseInt(runScript)
    }
}