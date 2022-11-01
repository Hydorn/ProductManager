import "./styles/Add.css";
type addProps = {
    handleAddModal: (param:void)=>void;
}
const Add: React.FC<addProps> = ({handleAddModal}) => {
    const handleOnClick = () =>{
        handleAddModal();
    }
    return(
        <div className="container_p add" onClick={handleOnClick}>
            <div className="circle"></div>
        </div>
    )
}
export default Add;