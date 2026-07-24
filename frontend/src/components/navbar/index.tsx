import Logo from "./Logo";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-20 bg-card-bg shadow-card">
            <div className="mx-auto max-w-6xl flex items-center justify-between gap-6 px-6 py-3">
                <Logo />
                <Navigation />
                <UserMenu />
            </div>
        </header>
    );
}