import React from "react"
import { useForm } from "react-hook-form"


export default function LoginForm({ onSubmit, isLoading, apiError }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    return (
        <div className="login-form-wrapper">
            <h1 className="login-title">Transformez<br />
                vos stats en résultats</h1>
            <h2 className="login-subtitle">Se connecter</h2>
            {apiError && <p className="error-msg">{apiError}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="username">Identifiant</label>
                    <input
                        id="username"
                        type="text"
                        {...register('username', { required: 'Veuillez renseigner votre identifiant' })}
                        
                    />
                    {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', { required: 'Le mot de passe est requis' })}
                        
                    />
                    {errors.password && <span className="error">{errors.password.message}</span>}
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => {alert('Mot de passe oublié cliqué')}}
                    >
                        Mot de passe oublié ?
                    </button>
                </div>
            </form>
        </div>
    )
}