'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkAuth } from '@/store/authSlice';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

export default function Page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { authUser, isCheckingAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const user = await dispatch(checkAuth()).unwrap();
        if (user) {
          router.push('/home');
        } else {
          router.push('/signup');
        }
      } catch {
        router.push('/signup');
      }
    };

    authenticate();
  }, [dispatch, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return null;
}
