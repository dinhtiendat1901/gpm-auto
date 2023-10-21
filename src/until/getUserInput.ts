import * as readline from 'readline';
import createMetamaskJob from "../job/createMetamaskJob";
import fixMetamaskJob from "../job/fixMetamaskJob";
import addWalletSubberJob from "../job/addWalletSubberJob";
import addWalletAlphabotJob from "../job/addWalletAlphabotJob";
import addWalletSuperfulJob from "../job/addWalletSuperfulJob";
import addSocialSuperfulJob from "../job/addSocialSuperfulJob";
import addSocialSubberJob from "../job/addSocialSubberJob";


export interface userInput {
    runType: number,
    runFrom: number,
    runTo: number,
    runScripts: Function[]
}

const scriptMap = new Map<number, Function>();
scriptMap.set(1, createMetamaskJob);
scriptMap.set(2, fixMetamaskJob);
scriptMap.set(3, addWalletAlphabotJob);
scriptMap.set(4, addWalletSuperfulJob);
scriptMap.set(5, addWalletSubberJob);
scriptMap.set(6, addSocialSuperfulJob);
scriptMap.set(7, addSocialSubberJob);


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const question = function (prompt: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(prompt, (answer: string) => {
            resolve(answer);
        });
    });
};


const getScriptFromInput = (input: string): Function[] => {
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
    console.log('Get ProfileId from:\n' +
        '1.Excel\n' +
        '2.Manual');
    const runType = await question('Your choice:');
    console.log('');
    if (runType === '2') {
        from = await question('From:');
        to = await question('To:');
        console.log('');
    }
    console.log('Select Script:');
    for (const [key, func] of scriptMap) {
        console.log(`${key}: ${formatString(func.name)}`);
    }
    const runScript = await question('Your choice:');
    const scriptFromInput = getScriptFromInput(runScript);
    return {
        runType: parseInt(runType),
        runFrom: parseInt(from),
        runTo: parseInt(to),
        runScripts: scriptFromInput
    }
}

function convertCamelToSpaces(str: string): string {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatString(str: string): string {
    // Convert camelCase to space-separated string
    const spacedString = convertCamelToSpaces(str);

    // Split the string into an array of words
    const words = spacedString.split(' ');

    // Capitalize the first letter of the first word
    words[0] = capitalizeFirstLetter(words[0]);

    // Uppercase the word preceding the last word
    if (words.length > 1) {
        words[words.length - 2] = words[words.length - 2].toUpperCase();
    }

    // Join the array back into a string
    return words.join(' ');
}