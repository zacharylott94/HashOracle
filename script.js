window.onload = () =>{

    function hashString(string,range){
        if (string === "" || !string){
            return "Empty"
        }
        if (string[string.length-1] !== "?"){
            return "NoMark"
        }
        string = string.toLowerCase()
        const unanswerable = [
            "how",
            "why",
            "what"
        ]
        const questionStarters = [
            "will",
            "can",
            "may",
            "should",
            "is",
            "are",
            "am",
            "do",
            "was"
        ]
        let first = string.split(" ")[0]
        if (unanswerable.indexOf(first) != -1){
            return "unAnswerable"
        }
        if (questionStarters.indexOf(first) === -1){
            return "NaQ"
        }




        let sum = 0
        for (let each in string){
            sum+= string.charCodeAt(each)
        }
        let hash = sum % range
        return hash
    }

    function predict(string){
        let hashTable = ["Yes.","No.","Maybe.","Not a chance.","Absolutely.","Indeterminate."]
        let hashRange = hashTable.length - 1
        let hash = hashString(string,hashRange)
        if (hash === "Empty"){
            return "No question was asked."
        }
        if(hash === "NoMark") {
            return "Questions end in question marks."
        }
        if(hash === "NaQ") {
            return "That's not really a question, is it?"
        }
        if(hash === "unAnswerable") {
            return "That's not a question I can answer."
        }
        return hashTable[hash]
    }

    function onButtonPress () {
        answer.innerHTML = predict(input.value)
    }

    function onEnterHandler(event){
        const key = event.key;
        if (key != "Enter"){return}
        const question = event.srcElement.value
        answer.innerHTML = predict(question)
    }


    const input = document.getElementById("question")
    const answer = document.getElementById("answer")
    const button = document.getElementById("button")
    button.onclick = onButtonPress
    input.onkeypress = onEnterHandler
}
