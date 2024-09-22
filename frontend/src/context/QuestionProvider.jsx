import React, { useState } from 'react'
import { createContext } from 'react'
export const questionContext = createContext()
const QuestionProvider = ({ children }) => {
    const [question,setQuestion]=useState([]);
    return (
        <>
            <questionContext.Provider value={{question,setQuestion}}>
                {children}
            </questionContext.Provider>

        </>
    )
}

export default QuestionProvider;