import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../Firebase/Config";
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc } from "firebase/firestore";



const Uploading = () => {


    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState(null)
    const [name, setName] = useState(null)
    const [uuid, setUuid] = useState(null)
    const [url, setUrl] = useState(null)


    const HandleChange = (e) => {
        setFile(e)
        setName(e.name)
        const id = uuidv4()
        setUuid(id)
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        const storageRef = ref(storage, uuid);
        await UploadImg(file, storageRef)
        await DownloadUrl(storageRef)
        await HandleUploadReg()
        setLoading(false)
    }


    const UploadImg = async (file, storageRef) => {
        setLoading(true)
        const uploaded = await uploadBytes(storageRef, file)
        alert('Archivo Subido ', uploaded)
        setFile(null)
    }

    const DownloadUrl = async (storageRef) => {
            const dwUrl = await getDownloadURL(storageRef)
            setUrl(dwUrl)
    }

    const HandleUploadReg = () => {
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
            <button
            onClick={HandleUploadReg}
            >Subir Registro</button>

            <hr/>
            <h3>Description of the problem</h3>
            <p>I have tried in a lot of different ways, but without success yet.</p>
            <p>I want to upload an img to a Firebase Storage, then, get the URL of that img just uploaded; and then push the URL, the Name, and the ID of that IMG in a Firebase Database, so I can have an index of all my images.</p>
            <p>But allways <strong>the first img</strong> I upload (after refreshing the page), doesn't register the URL. Then, if I keep uploading more images, everything work just fine.</p>
            <p>I don't understand why the first attempt goes wrong ant the others goes well.</p>
        </div>
    )
}

export default Uploading;