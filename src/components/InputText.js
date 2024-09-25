export default function InputText(props) {

    return (
        <div>
            <input type="text" id={props.id} placeholder={props.placeholder}></input>
        </div>
    );
}