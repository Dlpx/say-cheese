//import "./TarjetaImg.css"



const TarjetaImg = ( { img } ) => {
    return(
        <div className="contenedor">
            <img src={img.url} alt={img.name}/>
            <p>Imagen: {img.name}</p>
            <hr/>
            
        </div>
    )
}



export default TarjetaImg;