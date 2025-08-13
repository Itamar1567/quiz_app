import "react"
import {useState, useEffect} from "react"
import {MCQChallenge} from "../challenge/MCQChallenge.jsx";
import Popup from "../Popup/Popup.jsx";
import {useAPI} from "../util/api.js";

export function HistoryPanel() {
    const {makeRequest} = useAPI()
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    {/*Popup settings*/
    }
    const [isConfirmed, setIsConfirmed] = useState(false)
    const [showPopup, setShowPopup] = useState(false)


    {/*Functions to handle the confirmation pop up when resetting history*/
    }
    const handleConfirm = () => {
        setIsConfirmed(true);
        setShowPopup(false);
    }

    const handleCancel = () => {
        setIsConfirmed(false);
        setShowPopup(false)
    }

    const resetHistory = async () => {

        console.log("called delete history")
        //Tries to call the DELETE methods connected to the my-history route in the backend
        try {

            await makeRequest("my-history", {method: "DELETE"})
            fetchHistory()

        } catch (err) {
            setError("Failed to reset history.")
        } finally {
            setIsConfirmed(false)
        }
    }


    useEffect(() => {
        fetchHistory()
    }, [showPopup])

    useEffect(() => {
        if(isConfirmed) {resetHistory()}
    }, [isConfirmed]);

    const fetchHistory = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("my-history")
            setHistory(data.challenges)
        } catch (err) {
            setError("Failed to load history.")
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <div className="loading">Loading history...</div>
    }

    if (error) {
        return <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchHistory}>Retry</button>
        </div>
    }

    return <div className="history-panel">
        <div className={"history-header"}>
            <h2>History</h2>
            {/* if no history disable the reset button, as it is unneeded*/}
            <button
                className={"generate-button"}
                disabled={history.length === 0 || isLoading}
                onClick={() => {
                    setShowPopup(true);
                }}
            >
                Reset History
            </button>
            {/*If condition is true render this component */}
            {showPopup && <Popup onConfirm={handleConfirm} onCancel={handleCancel} text={"reset history"}/>}
        </div>

        {history.length === 0 ? (<p>No challenge history</p>) :
            <div className="history-list">
                {history.map((challenge) => {
                    return <MCQChallenge
                        challenge={challenge}
                        key={challenge.id}
                        showExplanation
                    />
                })}
            </div>
        }
    </div>
}