// src/pages/ScansPage.js
import React, { useState, useEffect } from 'react';


const API_URL = "http://localhost:5000/api/";

function ScansPage() {
    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({ nome: "", descricao: "", site: "", contato: "" });
    const [editId, setEditId] = useState(null);

    const fetchScans = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setScans(data);
        } catch (error) {
            alert("Erro ao buscar scans");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchScans();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const method = editId ? "PUT" : "POST";
            const url = editId ? `${API_URL}/${editId}` : API_URL;

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (!res.ok) throw new Error("Erro ao salvar scan");

            setForm({ nome: "", descricao: "", site: "", contato: "" });
            setEditId(null);
            fetchScans();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Quer mesmo deletar?")) return;

        try {
            const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Erro ao deletar");
            fetchScans();
        } catch {
            alert("Erro ao deletar");
        }
    };

    const handleEdit = (scan) => {
        setForm({
            nome: scan.nome || "",
            descricao: scan.descricao || "",
            site: scan.site || "",
            contato: scan.contato || "",
        });
        setEditId(scan._id);
    };

    return (
        <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
            <h1>Gerenciar Scans</h1>

            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    placeholder="Nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    placeholder="Descrição"
                    value={form.descricao}
                    onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    placeholder="Site"
                    value={form.site}
                    onChange={(e) => setForm({ ...form, site: e.target.value })}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <input
                    placeholder="Contato"
                    value={form.contato}
                    onChange={(e) => setForm({ ...form, contato: e.target.value })}
                    style={{ width: "100%", marginBottom: 10, padding: 8 }}
                />
                <button type="submit">{editId ? "Atualizar" : "Criar"} Scan</button>
                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setForm({ nome: "", descricao: "", site: "", contato: "" });
                            setEditId(null);
                        }}
                        style={{ marginLeft: 10 }}
                    >
                        Cancelar
                    </button>
                )}
            </form>

            {loading ? (
                <p>Carregando scans...</p>
            ) : (
                <ul>
                    {scans.map((scan) => (
                        <li key={scan._id} style={{ marginBottom: 10 }}>
                            <strong>{scan.nome}</strong> - {scan.descricao}{" "}
                            <button onClick={() => handleEdit(scan)} style={{ marginLeft: 10 }}>
                                Editar
                            </button>
                            <button onClick={() => handleDelete(scan._id)} style={{ marginLeft: 5, color: "red" }}>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ScansPage;
