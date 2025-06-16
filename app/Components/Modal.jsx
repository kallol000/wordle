import styles from "../lib/css/modal.module.css"
// import { IoMdClose } from "react-icons/io";
export default function Modal({children, setIsOpen, setDisplayHelp, setSuccess}){
    return(
        <>  
            <div className={styles.darkBG} onClick={() => {
                setIsOpen(false)
                setDisplayHelp(false)
                }} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        {/* <p>Hello</p> */}
                        {children}
                    </div>
                </div>
            </div>
            
        </>
    )
}