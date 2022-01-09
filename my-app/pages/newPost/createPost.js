import {useState} from 'react';
import {auth,db} from '../../firebase';
import styled from 'styled-components';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore"
import { doc,serverTimestamp,setDoc, query, where, collection, getDocs,getDoc,orderBy,docs ,addDoc} from "firebase/firestore";
import styles from  "./createpost.module.css"
import {useRouter} from 'next/router';
import Restricted from '../../components/Restricted';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Alert from '@mui/material/Alert';

function CreatePost(){
    const router = useRouter();
    const [user] = useAuthState(auth);

    const [success,setSuccess] = useState(0);
    const [failure,setFailure] = useState(0);

    const [newpost,setNewpost] = useState({
        title:"",
        goal:"",
        description:"",
        membercount:0,
        duration:0,
        weeklyhrs:0,
        skills:[]
    })

    const handleinput = (e)=>{
        let name,value;
        name=e.target.name;
        value=e.target.value;
        if(name === "duration" || name === "weeklyhrs" || name == "membercount"){
            value = parseInt(e.target.value);
            console.log("name: ",name , typeof value);
        }
        setNewpost({...newpost,[name]:value})
    }

    const addedDoc = "";
    const handlesubmit = (e)=>{
        e.preventDefault();
        const newColRef = collection(db,'posts');
        try{
            addDoc(newColRef,{
                userid : user?.email,
                name: user?.displayName,
                ...newpost,
                timestamp:serverTimestamp(),
                photo:user.photoURL,
            }).then((snapshot)=>{addedDoc = snapshot._key.path.segments[1]})
            setSuccess(1);
            // router.push('/newPost');
        }catch(err){
            setFailure(1);
        }
        
    }

    return (
        <div>
            {
                user?
                (<div className={styles.div}>
                    <form onSubmit={handlesubmit}>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Title</strong>
                            <label>
                                <input className={styles.input} type="text" name="title" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Goal</strong>
                            <label>
                                <input className={styles.input} type="text" name="goal" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Description</strong>
                            <label>
                                <textArea className={styles.input} type="text" name="description" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Total Members</strong>
                            <label>
                                <input className={styles.input} type="number" name="membercount" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Duration</strong>
                            <label>
                                <input className={styles.input} type="number" name="duration" onChange={handleinput} required/>
                            </label>
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <strong className={styles.bold}>Weekly Hours</strong>
                            <label>
                                <input className={styles.input}type="number" name="weeklyhrs" onChange={handleinput} required/>
                            </label> 
                            <Tooltip color="primary" sx={{width:"1.5rem", height:"1.5rem"}}title="This is Dhiraj Kumar Chintada" arrow>
                                <InfoOutlinedIcon/>
                            </Tooltip>
                        </div>
                        <div className={styles.innerdiv}>
                            <button className={styles.btn}>Post</button>
                        </div>
                    </form>
                    <div className={styles.innerdiv}>
                            <button className={styles.btn}>Click to view Post</button>
                        </div>
                    {success?(<Alert onClose={() => {setSuccess(0)}}>Your Post has been successfully posted</Alert>
                     ):(<div></div>)}

                    {failure?(<Alert severity="error" onClose={() => {setFailure(0)}}>There was an Error while posting your Post</Alert>
                     ):(<div></div>)}
                </div>
                ):(
                    <Restricted/>
                )
            }
            
        </div>
    )

}

export default CreatePost;

