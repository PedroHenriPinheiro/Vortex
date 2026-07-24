import { Link } from "react-router-dom";
import Leaf from "../../assets/leaf.svg";


export default function Logo() {
    return (
        <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={Leaf} alt="UniMarket Logo" className="h-7 w-7 shrink-0 object-contain" />
            <span className="font-display font-extrabold text-lg leading-none">
                <span className="text-brand-navy">Uni</span>
                <span className="text-brand-cyan">Market</span>
            </span>
        </Link>
    );
}