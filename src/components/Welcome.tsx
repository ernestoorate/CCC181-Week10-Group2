// Shown only after the API confirmed the login (200). Name and email come
// from the API response, not from the form.
import type { AuthUser } from '../types';

interface WelcomeProps {
  user: AuthUser;
  onLogout: () => void;
}

export default function Welcome({ user, onLogout }: WelcomeProps) {
  return (
    <section className="login-card welcome-card" aria-labelledby="welcome-user">
      <h2 id="welcome-user" className="login-card__title">
        Welcome, {user.name}
      </h2>
      <p className="welcome-card__email">{user.email}</p>
      <p className="login-card__subtitle">You are signed in to CampusConnect.</p>
      <button type="button" className="btn btn--secondary" onClick={onLogout}>
        Log out
      </button>
    </section>
  );
}
