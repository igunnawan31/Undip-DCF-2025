import React, { FormEvent, useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Router from 'next/router';
import Link from 'next/link';

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.target as HTMLFormElement;
        const data = {
            email: form.email.value,
            password: form.password.value,
        }
        console.log(data);
        try {
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            console.log(res) ;
            if(res.status === 200) {
                Router.push("/auth/login");
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

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
                        Create Account
                    </h1>
                    <p className="text-gray-600">Start your journey with us</p>
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
                        {isLoading ? 'Registering...' : 'Create Account'}
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? 
                        <Link
                            href="/auth/login" 
                            className="ml-1 font-medium hover:underline"
                            style={{color: '#008080'}}
                        >
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterView;