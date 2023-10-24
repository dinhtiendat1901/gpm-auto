function filterAndFormatWords(input: string): string {
    // Split the string by spaces to get individual words
    const words = input.split(' ');

    // Use regular expression to filter words containing only numbers, alphabets, and '-'
    const filteredWords = words.filter(word => /^[a-zA-Z0-9-]+$/.test(word));

    // Add '.' before each word and join them without spaces
    const formattedWords = filteredWords.map(word => '.' + word).join('');

    return formattedWords;
}

const inputString = 'iekbcc0 iekbcc9 ju367v84 ju367v6d ju367v6y ju367v7j ju367vo ju367vt ju367vv ju367v8o ju367v99 ju367vav g5kl0l0 _12cbo8i3 ju367v8m _12cbo8i6';
const result = filterAndFormatWords(inputString);

// Wrap the result string with document.querySelectorAll()
const wrappedResult = `document.querySelectorAll('${result}')`;
console.log(wrappedResult);
