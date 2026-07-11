import { useNavigate } from "react-router-dom";
import "./BottomStatusBar.css"

function BottomStatusBar() {

    const navigate = useNavigate();



    return (
        <>
    <h2>Status Bar</h2> 

    <button
    className="roadmap-home-button"
    onClick={() => navigate("/")}
>
    ← Home
</button>

</>
    )
}

export default BottomStatusBar;