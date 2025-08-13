import react from "react"


export default function Popup({onConfirm, onCancel, text}) {

    return (
        <div className={"popup-background"}>

            <div className={"popup"}>
                <p>Are you sure you want to { text }</p>
                <div className={"popup-buttons-header"}>
                    <button type="button" className="btn btn-success" onClick={onConfirm}>Confirm</button>
                    <button type="button" className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </div>
            </div>

        </div>


    );

}
