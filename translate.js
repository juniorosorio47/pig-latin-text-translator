const vowels = ['a', 'e', 'i', 'o', 'u', 'y']
const punctuationPattern = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

function isCapitalized(letter) {
    return letter === letter.toUpperCase();
}

const translateText = (text) => {
    if (text.length > 0 && !Boolean(Number(text))) {
        let result = ""
        let firstVowel = ""
        let prefix = ""
        let consonantsNumber = 0
        let firstLetterIsCaptalized = false
        let ponctuation = ""

        if(isCapitalized(text[0])){
            firstLetterIsCaptalized = true
        }

        // Check if the string has some ponctuation pattern
        if(text.match(punctuationPattern)){
            const ponctuationIndex = text.indexOf(text.match(punctuationPattern))
            ponctuation = text[ponctuationIndex]

            text = text.slice(0, ponctuationIndex) + text.slice(ponctuationIndex + 1)
        }

        text = text.toLowerCase()

        for (const letter of text) {
            if (!vowels.includes(letter)) {
                consonantsNumber++
            }
        }

        for (const letter of text) {
            if (vowels.includes(letter)) {
                firstVowel = letter
                break
            } else {
                prefix = prefix + letter
            }
        }

        const indexOfFirstVowel = text.indexOf(firstVowel)

        let stem = text.substring(indexOfFirstVowel, text.length)

        if(firstLetterIsCaptalized){
            stem = stem[0].toUpperCase() + stem.slice(1)
        }

        if(consonantsNumber==0){
            result = stem + prefix + "yay"
        }else{
            result = stem + prefix + "ay"
        }

        if(ponctuation!=""){
            result = result + ponctuation
        }

        return result
    }
    else {
        return text
    }
}

const translatePhrase = (phrase) => {
    let result = ""
    let words = phrase.split(" ")

    for(const word  of words){
        result =  result+" "+ translateText(word)
    }
    
    return result
}

if (process.argv.length < 3) {
    console.log('Please enter the text you want to translate, enclosed in either double or single quotes.')
    console.log("Example: \"Hello, World!\" or 'Hey buddy, how are you?'")
} else {
    const input = process.argv[2]
    const result = translatePhrase(input)
    console.log("Translated text: ", result)
}

