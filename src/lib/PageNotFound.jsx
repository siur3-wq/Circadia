import { useLocation } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import FunFact from '../components/game/FunFact';


export default function PageNotFound({}) {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    const { data: authData, isFetched } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const user = await base44.auth.me();
                return { user, isAuthenticated: true };
            } catch (error) {
                return { user: null, isAuthenticated: false };
            }
        }
    });
    
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="max-w-md w-full">
                <div className="text-center space-y-6">
                    <div className="text-6xl">🗺️</div>
                    {/* 404 Error Code */}
                    <div className="space-y-2">
                        <h1 className="text-7xl font-black text-primary/30">404</h1>
                    </div>
                    
                    {/* Main Message */}
                    <div className="space-y-3">
                        <h2 className="text-2xl font-black text-foreground">
                            Oops! Lost in the dungeon 🗺️
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            The page <span className="font-bold text-primary">"{pageName}"</span> couldn't be found.
                        </p>
                    </div>
                    
                    {/* Admin Note */}
                    {isFetched && authData.isAuthenticated && authData.user?.role === 'admin' && (
                        <div className="mt-4 p-4 bg-muted rounded-xl border border-border">
                            <p className="text-sm font-bold text-muted-foreground">🛠️ Admin: This page may not be implemented yet.</p>
                        </div>
                    )}
                    
                    <div className="flex justify-center"><FunFact /></div>
                    {/* Action Button */}
                    <div className="pt-6">
                        <button 
                            onClick={() => window.location.href = '/'} 
                            className="inline-flex items-center px-6 py-3 text-sm font-black text-white bg-gradient-to-r from-primary to-accent rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
                        >
                            🏠 Back to Quest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}