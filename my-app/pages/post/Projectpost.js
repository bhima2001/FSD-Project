import { useState} from 'react';
import styles from  "./Projectpost.module.css"

function Projectpost(){
    const [newpost,setNewpost] = useState({
        id : "",
        title:"",
        goal:"",
        description:"",
        membercount:"",
        duration:"",
        weeklyhrs:"",
        skills:[]
    })


    let value ,name;
    function handleinput(e){
        name=e.target.name;
        value=e.target.value;
        setNewpost({...newpost,[name]:value})
    }



    async function handlesubmit(e){
        e.preventDefault();
        await fetch("http://localhost:8000/posts/",{
            method:'POST',
            body:JSON.stringify(newpost),
            headers:{'Content-Type':'application/json'}
        })
        window.location.replace("/post")
    }

    return (
        <div className={styles.div}>
            <form onSubmit={handlesubmit}>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Id</strong>
                <label>
                    <input className={styles.input} type="number" name="id" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Title</strong>
                <label>
                    <input className={styles.input} type="text" name="title" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Goal</strong>
                <label>
                    <input className={styles.input} type="text" name="goal" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Description</strong>
                <label>
                    <textArea className={styles.input} type="text" name="description" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Total Members</strong>
                <label>
                    <input className={styles.input} type="number" name="membercount" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Duration</strong>
                <label>
                    <input className={styles.input} type="number" name="duration" onChange={handleinput} required/>
                </label>
                </div>
                <div className={styles.innerdiv}>
                    <strong className={styles.bold}>Weekly Hours</strong>
                <label>
                    <input className={styles.input}type="number" name="weeklyhrs" onChange={handleinput} required/>
                </label> 
                </div>
                <div className={styles.innerdiv}>
                    <button className={styles.btn}>Post</button>
                </div>
            </form>
        </div>
    )
}


export default Projectpost;