'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Loader2, Lock, Mail, User, MessageSquare } from "lucide-react";
import { signup, checkAuth } from '@/apis/authAPI.js';
import { useRouter } from 'next/navigation';
import AuthImagePattern from '@/components/AuthImagePattern';
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
     const { register, handleSubmit, formState: { errors }, reset } = useForm();
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const router = useRouter();

     // Submit handler for signup form
     const onSubmit = async (data) => {
          setLoading(true);
          try {
               const response = await signup(data);
               toast.success(response.message || "Account Created Successfully");
               reset();
               router.push('/home');
          } catch (error) {
               toast.error(error?.response?.data?.message || error.message || "Failed to Sign In");
          } finally {
               setLoading(false)
          }
     };

     const CheckAuth = async () => {
          try {
               const response = await checkAuth();
               if (response) {
                    router.push('/home');
               }
          } catch (error) {
               console.log(error || "Error in Check auth api");
          }
     };

     useEffect(() => {
          CheckAuth();
     })


     return (
          <div className="min-h-screen grid lg:grid-cols-2">
               {/* left side*/}
               <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                    <div className="w-full max-w-md space-y-8">
                         {/* LOGO */}
                         <div className="text-center mb-8">
                              <div className="flex flex-col items-center gap-2 group">
                                   <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                        <MessageSquare className="size-6 text-primary" />
                                   </div>
                                   <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                                   <p className="text-base-content/60">Get Started with you free Account</p>
                              </div>
                         </div>

                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                              {/* Full Name Field */}
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text font-medium">Full Name</span>
                                   </label>
                                   <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <User className="size-5 text-base-content/40" />
                                        </div>
                                        <input
                                             type="text"
                                             id="fullName"
                                             className={`input input-bordered w-full pl-10`}
                                             placeholder="John Doe"
                                             {...register('fullName', { required: 'Full Name is required' })}
                                        />

                                   </div>
                                   {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                              </div>

                              {/* Email Field */}
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text font-medium">E-mail</span>
                                   </label>
                                   <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Mail className="size-5 text-base-content/40" />
                                        </div>
                                        <input
                                             type="email"
                                             id="email"
                                             className={`input input-bordered w-full pl-10`}
                                             placeholder="your@example.com"
                                             {...register('email', { required: 'Email is required' })}
                                        />
                                   </div>
                                   {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                              </div>

                              {/* Password Field */}
                              <div className="form-control">
                                   <label className="label">
                                        <span className="label-text font-medium">Password</span>
                                   </label>
                                   <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                             <Lock className="size-5 text-base-content/40" />
                                        </div>
                                        <input
                                             type={showPassword ? "text" : "password"}
                                             id="password"
                                             placeholder="••••••••"
                                             className="input input-bordered w-full pl-10"
                                             {...register('password', {
                                                  required: 'Password is required',
                                                  minLength: {
                                                       value: 6,
                                                       message: 'Password must be at least 6 characters long',
                                                  },
                                             })}
                                        />

                                        <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                             {
                                                  showPassword ? (
                                                       <EyeOff className="size-5 text-base-content/40" />
                                                  ) : (
                                                       <Eye className="size-5 text-base-content/40" />
                                                  )
                                             }
                                        </button>
                                   </div>
                                   {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                              </div>

                              {/* Submit Button */}
                              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                                   {loading ?
                                        (<>
                                             <Loader2 className="size-5 animate-spin" />Loading...</>)
                                        : (
                                             "Create Account"
                                        )
                                   }
                              </button>
                         </form>

                         <div className="text-center">
                              <p className="text-base-content/60">
                                   Already have an account {" "}
                                   <span className="link link-primary" onClick={() => router.push('/login')}>Login</span>
                              </p>
                         </div>
                    </div>
               </div>

               {/* right side*/}
               <AuthImagePattern
                    title="Join our community"
                    subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
               />
               <Toaster />
          </div>
     )
}

export default Signup
