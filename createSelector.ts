function filterAndFormatWords(input: string): string {
    // Split the string by spaces to get individual words
    const words = input.split(' ');

    // Use regular expression to filter words containing only numbers, alphabets, and '-'
    const filteredWords = words.filter(word => /^[a-zA-Z0-9-]+$/.test(word));

    // Add '.' before each word and join them without spaces
    const formattedWords = filteredWords.map(word => '.' + word).join('');

    return formattedWords;
}

const inputString = 'px-8 sm:px-0 sm:w-52 capitalize inline-flex items-center py-3 justify-center border border-transparent text-base font-medium rounded-xl shadow-sm !text-neutral-800 bg-teal-400  hover:bg-teal-500  focus:outline-none transition w-56';
const result = filterAndFormatWords(inputString);

// Wrap the result string with document.querySelectorAll()
const wrappedResult = `document.querySelectorAll('${result}')`;
console.log(wrappedResult);
