import * as readline from 'readline';
import createMetamaskJob from "../job/createMetamaskJob";
import signInAlphabotJob from "../job/signInAlphabotJob";
import fixMetamaskJob from "../job/fixMetamaskJob";
import signInSuperful from "../job/signInSuperful";
import twDisWithSuperfulJob from "../job/twDisWithSuperfulJob";


export interface userInput {
    runType: number,
    runFrom: number,
    runTo: number,
    runScripts: Function[]
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
const getScriptFromInput = (input: string): Function[] => {
    const scriptMap = new Map<number, Function>();
    scriptMap.set(1, createMetamaskJob);
    scriptMap.set(2, signInAlphabotJob);
    scriptMap.set(3, fixMetamaskJob);
    scriptMap.set(4, signInSuperful);
    scriptMap.set(5, twDisWithSuperfulJob);


    const numbersArray = input.split(' ').map(Number);
    const filteredScript = [];
    for (const num of numbersArray) {
        const func = scriptMap.get(num);
        if (func) {
            filteredScript.push(func);
        }
    }
    return filteredScript;
}


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
        '2.Link metamask với alphabot\n' +
        '3.Fix metamask\n' +
        '4.Link metamask với superful\n' +
        '5.Link tw discord với superful');
    const runScript = await question('Chọn:');
    const scriptFromInput = getScriptFromInput(runScript);
    return {
        runType: parseInt(runType),
        runFrom: parseInt(from),
        runTo: parseInt(to),
        runScripts: scriptFromInput
    }
}