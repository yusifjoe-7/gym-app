'use client';


import { useTheme } from "next-themes"
import Link from "next/link";

function TopNav() {
  const { theme, setTheme } = useTheme();


  return (
    <nav className="fixed top-0 left-0 right-0 bg-background border-t border-border h-16 hidden sm:flex items-center justify-between px-10 text-foreground shadow-sm" >
      <h1 className="font-heading font-bold cursor-pointer "><Link href="/">
      <span className="text-primary">GYM</span> tracker
      </Link></h1>
      <div className="flex items-center space-x-6 font-sans">
        <Link href="/">Home</Link>
        <Link href="/workouts">Workouts</Link>
        <Link href="/programs">Programs</Link>
      </div>
      <div className="flex items-center space-x-4">
      <span 
      onClick={()=> setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="change theme"
      className="cursor-pointer"
      >
        
       <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.85367 1.48956C7.65841 1.29429 7.34182 1.29429 7.14656 1.48956L1.48971 7.14641C1.29445 7.34167 1.29445 7.65825 1.48971 7.85352L7.14656 13.5104C7.34182 13.7056 7.65841 13.7056 7.85367 13.5104L13.5105 7.85352C13.7058 7.65825 13.7058 7.34167 13.5105 7.14641L7.85367 1.48956ZM7.5 2.55033L2.55037 7.49996L7.5 12.4496V2.55033Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
      
      </span>
      <span className="cursor-pointer">
        <Link href="/profile">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
        </Link>
      </span>
      </div>
    </nav>
  )
}

export default TopNav
