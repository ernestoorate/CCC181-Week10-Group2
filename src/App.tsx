import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BrandPanel from './components/BrandPanel';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { AuthError, clearToken, getMe, getToken, saveToken } from './api/auth';
import type { AuthUser, LoginResult } from './types';

export default function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  // true while we check a saved token, so the login form does not flash
  const [checking, setChecking] = useState<boolean>(() => getToken() !== null);
  const [notice, setNotice] = useState<string>('');

  // Stay logged in on refresh: ask the API who the saved token belongs to.
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    let cancelled = false;

    getMe(token)
      .then((me) => {
        if (!cancelled) setUser(me); // 200
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof AuthError && error.kind === 'unauthorized') {
          clearToken(); // 401: the token is no good
        } else {
          setNotice('Cannot check your session right now. Please sign in again.');
        }
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  function handleLoggedIn({ token, user: me }: LoginResult) {
    saveToken(token);
    setNotice('');
    setUser(me);
  }

  function handleLogout() {
    clearToken();
    setUser(null);
    setNotice('');
  }

  return (
    <div className="page">
      <Navbar />
      <main className="container">
        <div className="login-layout">
          <BrandPanel />
          {checking ? (
            <section className="login-card" aria-busy="true">
              <p className="auth-message" role="status">
                Checking your session...
              </p>
            </section>
          ) : user ? (
            <Welcome user={user} onLogout={handleLogout} />
          ) : (
            <LoginForm onLoggedIn={handleLoggedIn} notice={notice} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
