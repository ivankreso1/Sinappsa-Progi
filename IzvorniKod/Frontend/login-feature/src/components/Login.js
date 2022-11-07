import React from "react";

export default function Login() {

    return (
        <div>
            <h1>Login</h1>
            <form>
                <div className="info-input">
                    <input
                        type="email"
                        placeholder="E-mail adresa"
                        required
                    >
                    </input>
                    <input
                        type="password"
                        placeholder="Lozinka"
                        required>

                    </input>
                    <button
                    type = "submit"> Submit </button>
                </div>
            </form>
        </div>
    )
}