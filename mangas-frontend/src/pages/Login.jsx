import React, { useState} from 'react';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.msg || "Erro ao logar");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setError(null);

            window.location.href = "/dashboard"; // redireciona para dashboard ou home
        } catch (err) {
            setError("Erro na rede");
        }
    }

    return (
        <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" style={{ width: "100%", padding: 10 }}>
                    Entrar
                </button>
            </form>
        </div>
    );
}

export default Login;
