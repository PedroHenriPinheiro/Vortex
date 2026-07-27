import { useAuth } from "../../hooks/UseAuth";

export default function Profile() {
    
    const { user } = useAuth();

    const initials = user?.name
        ? user.name
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")
              .toUpperCase()
        : "?";

    return (
        <main className="min-h-screen bg-surface px-4 sm:px-6 py-10 bottom-safe">
            <div className="mx-auto max-w-md">
                <h1 className="font-display text-2xl font-bold text-text-primary mb-6">
                    Perfil
                </h1>

                <div className="bg-card-bg rounded-card shadow-card p-6 sm:p-8">
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="h-20 w-20 rounded-full bg-brand-cyan-light text-brand-navy font-display font-bold text-2xl flex items-center justify-center mb-3">
                            {initials}
                        </div>
                        <h2 className="font-display font-semibold text-lg text-text-primary">
                            {user?.name}
                        </h2>
                        <p className="text-sm text-text-secondary">{user?.email}</p>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 border-t border-slate-200">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                                Nome
                            </span>
                            <span className="text-sm text-text-primary">{user?.name}</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                                Email
                            </span>
                            <span className="text-sm text-text-primary">{user?.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}