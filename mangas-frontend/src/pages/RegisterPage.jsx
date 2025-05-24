import React, { useState, useEffect } from 'react';


export default function RegisterPage() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [message, setMessage] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage(null);

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage("Usuário criado com sucesso! Agora faça login.");
                setForm({ username: "", email: "", password: "" });
            } else {
                setMessage(data.msg || "Erro ao registrar.");
            }
        } catch (error) {
            setMessage("Erro de conexão.");
        }
    }

    return (
        <div>
            <h2>Registrar</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Usuário"
                    value={form.username}
                    onChange={handleChange}
                    required
                />
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
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
}
