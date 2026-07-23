import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function Navigation() {
    const {isAuthenticated} = useAuth()

    return (
        <div>
            <Link to="/adsList">Explorar</Link>

            {" | "}

            <Link to="/create-ad">Anunciar</Link>

            { 
                isAuthenticated && (
                    <>
                        {" | "}

                        <Link to="/myAds">Meus Anúncios</Link>
                    </>
                )
            }
        </div>
    )
}