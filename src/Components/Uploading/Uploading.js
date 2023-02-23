import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../Firebase/Config";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";



const Uploading = () => {


    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)
    const [uuid, setUuid] = useState(null)


    const HandleChange = (e) => {
        setFile(e)
        setName(e.name)
        const id = uuidv4()
        setUuid(id)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        const storageRef = ref(storage, uuid);
        await UploadImg(storageRef)
        await DownloadUrl(storageRef)
        setLoading(false)
    }
    
    
    const UploadImg = async (storageRef) => {
        setLoading(true)
        await uploadBytes(storageRef, file)
        setFile(null)
    }
    
    const DownloadUrl = async (storageRef) => {
        const url = await getDownloadURL(storageRef)
        await HandleUploadReg(url)
    }
    
    const HandleUploadReg = (url) => {
        const Registro = {
            id:uuid,
            name: name,
            url:url
        }

        UploadReg(Registro)
    }

    const UploadReg = async (reg) => {
        try {
            const docRef = await addDoc(collection(db, "imgs"), reg);
            console.log(`Id de la escritura: ${docRef.id}`);
          } catch (e) {
            console.error(`Error al subir documento: ${e}`);
          }
    }

    return (
        <div>
            <h1>Uploading Section</h1>

            <form onSubmit={HandleSubmit}>
                <input
                    type="file"
                    onChange={e => HandleChange(e.target.files[0])}
                />
                <button
                    type="submit"
                    disabled={file===null || loading }
                >Subir</button>
            </form>
        </div>
    )
}

export default Uploading;