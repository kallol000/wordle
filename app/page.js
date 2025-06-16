"use client"
import { useActionState, useRef, useState } from "react";
import InputArr from "./Components/InputArr";
import { answer } from "./lib/data/data";
import styles from "./lib/css/main.module.css"
import Modal from "./Components/Modal";
import { MdHelpCenter } from "react-icons/md";
import Image from "next/image";

export default function Home() {
  
  const ref = useRef([])
  // const [occurence, setOccurence] = useState
  
  const answerMap = new Map()
  answerMap.set("ans", answer)
  for(let i = 0; i < answer.length; i++) {
    if(!answerMap.has(answer[i])){
      answerMap.set(answer[i], [i])
    }else{
      answerMap.set(answer[i], [...answerMap.get(answer[i]), i])
    }
  }

  // console.log(answerMap)

  const [classNames, setClassNames] = useState(new Array(6).fill(new Array(5).fill("inputDefault")))
  const [rowNum, setRowNum] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [displayHelp, setDisplayHelp] = useState(false) 
  const [success, setSuccess] = useState(false)


  // console.log(classNames)

  const showHelp = () => {
    setModalOpen(true)
    setDisplayHelp(true)
  }

  return (
    <div className={styles.main}>
      <div className={styles.title}>
        <h1 className={styles.title}>WORDLE</h1>
        <MdHelpCenter className={styles.help} onClick={showHelp} />
      </div>
      <div >
        <InputArr
          elems = {[0,1,2,3,4]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {0}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
          />
        
        <InputArr
          elems = {[5,6,7,8,9]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {1}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
          />
        <InputArr
          elems = {[10, 11, 12, 13, 14]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {2}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
          />
        <InputArr
          elems = {[15, 16, 17, 18, 19]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {3}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
          />
        <InputArr
          elems = {[20, 21, 22, 23, 24]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {4}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
          />
        <InputArr
          elems = {[25, 26, 27, 28, 29]}
          classNames = {classNames}
          setClassNames={setClassNames}
          row = {5}
          rowNum={rowNum}
          setRowNum = {setRowNum}
          ref = {ref}
          answer = {answerMap}
          setSuccess = {setSuccess}
          setModalOpen = {setModalOpen}
        />
      </div>
      
      
      {
        modalOpen 
        
        &&

        <Modal
          open = {modalOpen}
          setIsOpen = {setModalOpen}
          setDisplayHelp = {setDisplayHelp}
          setSuccess = {setSuccess}
        >
          {displayHelp && 
            <Image src={"/wordle_howtoplay.png"} alt="how to play" width={400} height={100}/>
          }
          {/* {success && 
            <h1>Congrats! </h1>
          } */}
          {/* <img src="public/wordle_howtoplay.PNG" alt="hhh" />  */}

        </Modal>
      }
    </div>

  );
}
