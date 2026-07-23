import { Link } from "react-router-dom";
import Leaf from "../../assets/leaf.svg"

export default function Logo() {
    return (
        <Link to="/"> <img src={Leaf} alt="UniMarkt Logo"/><span id="Uni">Uni</span><span id="Market">Market</span></Link>
    )
}

