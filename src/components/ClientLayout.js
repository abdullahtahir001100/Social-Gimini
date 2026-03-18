"use client";

import { useAuth, SignIn, SignUp } from "@clerk/nextjs";
import { useState, useMemo } from "react";
import Header from "./Header";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Appearance memoized to avoid lag on state changes
  const authAppearance = useMemo(() => ({
    elements: {
      card: {
        border: '3px solid #000',
        boxShadow: '8px 8px 0px #000',
        borderRadius: '0px',
      },
      headerTitle: { fontWeight: '950', textTransform: 'uppercase', fontSize: '1.2rem' },
      socialButtonsBlockButton: {
        border: '2px solid #000',
        borderRadius: '0px',
        boxShadow: '3px 3px 0px #000',
      },
      formButtonPrimary: {
        backgroundColor: '#000',
        borderRadius: '0px',
        fontWeight: '900',
        textTransform: 'uppercase',
      },
      formFieldInput: {
        border: '2px solid #000',
        borderRadius: '0px',
      },
      footer: { display: 'none' },
      footerAction: { display: 'none' }
    }
  }), []);

  if (!isLoaded) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '40px', height: '40px', border: '5px solid #000', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div style={{ 
        display: 'flex', flexDirection: 'column', justifyContent: 'center', 
        alignItems: 'center', height: '100vh', background: '#fff', gap: '20px'
      }}>
        <h1 style={{ fontWeight: 950, textTransform: 'uppercase', fontSize: '2rem' }}>
          SOCIAL<span style={{ background: '#000', color: '#fff', padding: '0 10px' }}>GEMINI</span>
        </h1>

        {isSignUp ? (
          <SignUp routing="hash" signInUrl="/" appearance={authAppearance} />
        ) : (
          <SignIn routing="hash" signUpUrl="/" appearance={authAppearance} />
        )}

        <button 
          onClick={() => setIsSignUp(!isSignUp)}
          style={{
            background: '#fff', border: '3px solid #000', padding: '10px 20px',
            fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', 
            boxShadow: '4px 4px 0px #000', transition: '0.1s'
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(2px, 2px)'; e.currentTarget.style.boxShadow = 'none'; }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '4px 4px 0px #000'; }}
        >
          {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="layout-container" style={{ display: 'flex', minHeight: 'calc(100vh - 60px)' }}>
        <main style={{ width: '100%', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </>
  );
}