import { useNavigate } from "react-router-dom";


export const Main = () => {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2]">
            <div className="rounded flex flex-col justify-center items-center p-4">
                <span className="text-white text-4xl font-bold">Book Exchange</span>
                <span className="text-white">Exchange books. Share thoughts. Read together.</span>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="flex flex-col gap-3 bg-white rounded-2xl shadow p-6">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users w-5 h-5 text-[#667eea]" data-fg-bgu618="1.80:1.3617:/src/app/pages/auth/Welcome.tsx:37:15:1501:44:e:Users::::::DV8M" data-fgid-bgu618=":rb:"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                    <span className="">Join clubs</span>
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-2xl shadow p-6">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star w-5 h-5 text-[#667eea]" data-fg-bgu623="1.80:1.3617:/src/app/pages/auth/Welcome.tsx:43:15:1865:43:e:Star::::::hX0" data-fgid-bgu623=":rf:"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                    </span>
                    <span className="">Write Reviews</span>
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-2xl shadow p-6">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open w-5 h-5 text-[#667eea]" data-fg-bgu628="1.80:1.3617:/src/app/pages/auth/Welcome.tsx:49:15:2231:47:e:BookOpen::::::BP4H" data-fgid-bgu628=":rj:"><path d="M12 7v14"></path><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path></svg>
                    </span>
                    <span className="">Exchange Books</span>
                </div>
                <div className="flex flex-col gap-3 bg-white rounded-2xl shadow p-6">
                    <span className="rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar w-5 h-5 text-[#667eea]" data-fg-bgu633="1.80:1.3617:/src/app/pages/auth/Welcome.tsx:55:15:2602:47:e:Calendar::::::Bbz4" data-fgid-bgu633=":rn:"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
                    </span>
                    <span className="">Attend Events</span>
                </div>
            </div>
            <div className="flex flex-col justify-center gap-3 py-4 w-full max-w-md">
                <button type="button" className="text-blue-400 bg-gray-300 p-4 w-full rounded-2xl shadow text-sm font-medium hover:bg-gray-200 transition" onClick={() => navigate('/login')}>Sign In</button>
                <button type="button" className="bg-transparent p-4 w-full rounded-2xl shadow text-sm font-medium hover:bg-gray-200 transition">Create account</button>
            </div>
        </div>
    )
}
