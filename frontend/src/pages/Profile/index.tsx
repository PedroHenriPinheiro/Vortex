import { useAuth } from "../../hooks/UseAuth";

export default function Profile() {
    const {user} = useAuth();

    return(
        <main>
            <h1>Perfil</h1>
            <br />
            <h4>Nome: {user?.name}</h4>
            <br />
            <h4>Email: {user?.email}</h4>
        </main>
    )
}