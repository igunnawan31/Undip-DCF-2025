import React, { FormEvent, useState } from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const LoginView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        
        const form = e.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            password: form.password.value,
        };

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: '/'
            });

            if (res?.error) {
                switch (res.error) {
                    case "User not found":
                        setError("Account tidak ditemukan. Silahkan register terlebih dahulu.");
                        break;
                    case "Invalid password":
                        setError("Password salah. Silahkan coba lagi.");
                        break;
                    default:
                        setError("Login gagal. Silahkan coba lagi.");
                }
            } else {
                Router.push(res?.url || '/');
            }
        } catch (error) {
            console.error(error);
            setError("Terjadi kesalahan pada sistem. Silahkan coba lagi nanti.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div 
                className="w-full max-w-md p-8 space-y-6 rounded-2xl shadow-2xl relative overflow-hidden bg-white"
                style={{
                    borderColor: '#008080',
                    boxShadow: '0 10px 25px rgba(0, 128, 128, 0.2)'
                }}
            >
                {/* Decorative background element */}
                <div 
                    className="absolute top-0 left-0 right-0 h-2" 
                    style={{backgroundColor: '#008080'}}
                ></div>

                <div className="text-center pt-4">
                    <h1 
                        className="text-3xl font-bold mb-2"
                        style={{color: '#008080'}}
                    >
                        Sign In
                    </h1>
                    
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <label 
                            htmlFor="email" 
                            className="block text-sm font-medium mb-2"
                            style={{color: '#008080'}}
                        >
                            Email
                        </label>
                        <div className="relative">
                            <Mail 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                placeholder="Enter your email" 
                                className="w-full px-4 pl-10 py-2 border rounded-lg text-black 
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-teal-300 
                                    focus:border-teal-500"
                                required 
                            />
                        </div>
                    </div>

                    <div className="relative">
                        <label 
                            htmlFor="password" 
                            className="block text-sm font-medium mb-2"
                            style={{color: '#008080'}}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <Lock 
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                                size={20} 
                            />
                            <input 
                                type={isPasswordVisible ? "text" : "password"} 
                                name="password" 
                                id="password" 
                                placeholder="Create a strong password" 
                                className="w-full px-4 pl-10 pr-10 py-2 border rounded-lg text-black
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-teal-300 
                                    focus:border-teal-500"
                                required 
                            />
                            <button 
                                type="button" 
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="absolute inset-y-0 right-0 flex items-center px-3"
                            >
                                {isPasswordVisible ? (
                                    <EyeOff className="text-gray-400" />
                                ) : (
                                    <Eye className="text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error message display */}
                    {error && (
                        <div 
                            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2"
                            role="alert"
                        >
                            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full py-3 rounded-lg text-white font-semibold 
                            transition-all duration-300 ease-in-out 
                            transform hover:scale-105 
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-teal-300"
                        style={{
                            backgroundColor: '#008080',
                            backgroundImage: `linear-gradient(to right, #008080, ${isLoading ? '#ffffff' : '#fdbe85'})`,
                            pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                    >
                        {isLoading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Doesnt have an account?
                        <Link
                            href="/auth/register" 
                            className="ml-1 font-medium hover:underline"
                            style={{color: '#008080'}}
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginView;