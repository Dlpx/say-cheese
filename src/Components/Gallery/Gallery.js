//import "./Gallery.css"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/Config";
import TarjetaImg from "./TarjetaImg";






const Gallery = () => {
    
    const [galeria, setGaleria] = useState([])

    useEffect(() => {
        const imgs = []
        getDocs(collection(db, "imgs"))
        .then( (respuesta) => {
            respuesta.forEach((doc) => {
                imgs.push({
                    docId: doc.id,
                    ...doc.data()
                })
            })
            setGaleria(imgs)
        })
    }, [])


    

    return(
        <div>
            <h1>Fotos Subidas</h1>
            {
                galeria.map((img) => <TarjetaImg img={img} key={img.docId}/>)
            }
            
        </div>
    )
}



export default Gallery;