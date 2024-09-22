 const  shuffleArray=(array) =>{
    for (let i = array.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at index i and j
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
const validateAnswer = (answer,question) => {
    const obj = { correct: 0, attempted: 0, unattempted: 0 };

    for (let i = 0; i < answer.length; i++) {
        console.log(answer[i],question[i].correct_answer);
        if (!answer[i]) {
            obj.unattempted += 1;
        } else if (answer[i] ==question[i].correct_answer) {
            obj.correct += 1;
            obj.attempted += 1;
        } else {
            obj.attempted += 1; // Increment attempted even if the answer is wrong
        }
    }

    return obj;
};
module.exports={shuffleArray,validateAnswer}
