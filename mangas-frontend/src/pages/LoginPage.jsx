import React, { useState, useEffect } from 'react';


export default function LoginPage({ onLogin }) {
    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Login bem-sucedido!");
                // Passar token e usuário para o componente pai
                onLogin(data.token, data.user);
            } else {
                setMessage(data.msg || "Erro ao fazer login.");
            }
        } catch (error) {
            setMessage("Erro de conexão.");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Senha"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}
