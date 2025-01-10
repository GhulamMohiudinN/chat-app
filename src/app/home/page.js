'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/store/authSlice';

const HomePage = () => {
     const dispatch = useDispatch();
     const router = useRouter();

     useEffect(() => {
          const validateAuth = async () => {
               try {
                    // Dispatch the checkAuth action
                    const user = await dispatch(checkAuth()).unwrap();
                    if (!user) {
                         // If no user is found, redirect to signup
                         router.push('/signup');
                    }
               } catch {
                    // If any error occurs, redirect to signup
                    router.push('/signup');
               }
          };

          validateAuth();
     }, [dispatch, router]);

     return (
          <div>
               <p>I am home page</p>
          </div>
     );
};

export default HomePage;
