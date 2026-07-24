import Logo from "./Logo";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 bg-card-bg shadow-card">
            <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-3 items-center gap-4 px-4 sm:px-6 py-3">
                <Logo />

                <div className="hidden md:flex justify-center">
                    <Navigation />
                </div>

                <div className="hidden md:flex justify-end">
                    <UserMenu />
                </div>

                <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden justify-self-end p-2 rounded-btn text-text-secondary hover:bg-surface transition-colors"
                    aria-label="Abrir menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-slate-200 bg-card-bg px-4 py-4 flex flex-col gap-4 animate-fade-up">
                    <Navigation />
                    <div className="pt-2 border-t border-slate-200">
                        <UserMenu />
                    </div>
                </div>
            )}
        </header>
    );
}