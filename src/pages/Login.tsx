import { useState } from "react";

type User = {
  email: string;
  password: string;
  role: string;
};

const users: User[] = [
  { email: "admin@gmail.com", password: "1234", role: "admin" },
  { email: "client@gmail.com", password: "0000", role: "client" },
];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      window.location.reload();
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Connexion
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="mb-4 w-full rounded-xl border px-4 py-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="mb-4 w-full rounded-xl border px-4 py-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-xl bg-orange-500 py-3 text-white">
          Se connecter
        </button>
      </form>
    </section>
  );
}