import { useState, useEffect, useRef } from "react"
import styles from "../lib/css/inputarr.module.css"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { count } from "../lib/utils/utils"

export default function InputArr({row, rowNum, setRowNum, elems, ref, answer, classNames, setClassNames, setSuccess, setModalOpen}){

    // console.log(rowNum)
    const [attempt, setAttempt] = useState("")
    
    
    const rowElems = elems.map(( elem, index ) => 
        <input 
            key={elem}
            ref={(reference) => ref.current[elem] = reference}
            className={`${styles.input} ${styles[classNames[row][index]]} `}  
            maxLength={1}
            onKeyUp={(e) => handleBackandEnter(e, row, index)}
            onChange={(e) => handleChange(e, row, index)}
            value = {attempt[index] ? attempt[index] : ""}
            />
    )
    
    useEffect(() => {
        ref?.current[0].focus()
    },[])
    // console.log(ref.current)

    const handleChange = (e, row, index) => {
            console.log("index", index)
            setAttempt(prev => prev + e.target.value.toUpperCase())
            if(index !== 4){
                ref.current[(rowNum * 5) + (index + 1)].focus()
            }
        }
    
        
    const handleBackandEnter = async (e, row, index) => {
        

        if(e.key === "Backspace") {
            setAttempt(prev => prev.substring(0, prev.length - 1))
            if(index === 4) {
                ref.current[(rowNum * 5) + (index)].focus()
            }else if(index !== 0){
                ref.current[(rowNum * 5) + (index - 1)].focus()
            }

        }

        console.log(answer, attempt)
        
        if(e.key === "Enter"){
            if(attempt.length === 5){
                try {
                    const res = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${attempt}`)
                    let map = new Map()
                    for(let i = 0; i < attempt.length; i++) {
                        if(answer.has(attempt[i]) && answer.get(attempt[i]).includes(i)){
                            // console.log(attempt[i], i)
                            // setAnswerCopy(prev => {
                            //     let ans = new Map(prev)
                            //     ans.set(attempt[i], [...ans.get(attempt[i]).filter(x => x !== i)])
                            //     return ans
                            // }) 
                            if(map.has(attempt[i])){
                                map.set(attempt[i], map.get(attempt[i]) + 1)
                            }else{
                                map.set(attempt[i], 1)
                            }

                            // console.log(map)
                            
                            setClassNames(prev => {
                                const result = [...prev];
                                result[row] = [...result[row]]; // Create a shallow copy of the row array
                                result[row][i] = "inputCorrect";
                                return result;
                            })
                        }
                    }

                    // console.log(map)
                    
                    for(let i = 0; i < attempt.length; i++) {
                        if(answer.has(attempt[i])) {
                                if(map.has(attempt[i])) {
                                    if(answer.get(attempt[i]).length - map.get(attempt[i]) > 0) {
                                        setClassNames(prev => {
                                            const result = [...prev];
                                            result[row] = [...result[row]]; // Create a shallow copy of the row array
                                            result[row][i] = result[row][i] === "inputDefault" ?  "inputIncorrectPlace" : result[row][i];
                                            // result[row][i] === "inputDefault" ?  "inputIncorrectPlace" : result[row][i];
                                            return result;
                                        })
                                        map.set(attempt[i], map.get(attempt[i]) + 1 )
                                    }
                                }else{
                                    setClassNames(prev => {
                                        const result = [...prev];
                                        result[row] = [...result[row]]; // Create a shallow copy of the row array
                                        result[row][i] = result[row][i] === "inputDefault" ?  "inputIncorrectPlace" : result[row][i];
                                        // result[row][i] === "inputDefault" ?  "inputIncorrectPlace" : result[row][i];
                                        return result;
                                    })
                                }
                            }
                    }

                    setClassNames(prev => {
                        const result = [...prev]
                        result[row] = result[row].map(classname => classname === "inputDefault" ? "inputNotPresent" : classname)
                        return result
                    }) 
                    
                    

                    if(rowNum !== 5){
                        setRowNum(prev => prev + 1)
                        ref.current[(rowNum * 5) + (index + 1)].focus()
                    }
                    
                    // console.log(ref.current)
                }catch(err) {
                    if(err.response.data.title === 'No Definitions Found') {
                        toast.error("Please enter a valid word")
                    }
                }
            }else{
                toast.error("Please try with a five letter word")
            }

            // console.log(answer.get("answer"))

            if(attempt === answer.get("ans")) {
                if(rowNum === 5) {
                    toast.success("Phew")
                }else if(rowNum === 0 || rowNum === 1) {
                    toast.success("Awesome!")
                }else {
                    toast.success("Congrats")
                }
                // setClassNames(prev => )
                setClassNames(prev => {
                    for(let i = rowNum + 1; i < classNames.length; i++) {
                        console.log(prev[i])
                        // prev[i] = [...prev[i]]
                        prev[i] = prev[i].map(x => x === "inputDefault" ? "inputDisabled" : x)
                    }
                    return prev
                })
            }
            // if(rowNum === 5 && attempt === answer.get("ans")) {
            // }
            if(rowNum === 5 && attempt.length === 5 && attempt !== answer.get("ans")) {
                toast.error(`The answer is ${answer.get("ans")}. Better luck next time`)
            }
        }
    }

    return (
        <div key = {row} className="flex justify-center gap-2 p-1">
           {rowElems}
            <Toaster 
                position="bottom-center"
                toastOptions={{
                    success: {
                      style: {
                        border: "2px solid #7DCFB6",
                      },
                    },
                    error: {
                      style: {
                        border: "2px solid #BB513A "
                      },
                    },
                  }}
            />
        </div>
    )
}