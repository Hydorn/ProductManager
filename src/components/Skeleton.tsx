import "./styles/Skeleton.css"
const Skeleton = () =>{
    return(
        <div className="container_ph">
            <div className="img_ph"></div>
            <div className="text_ph">
                <div className="title_ph"></div>
                <div className="content_ph"></div>
                <div className="content_ph"></div>
            </div>
        </div>
    )
}
export default Skeleton;