'use client';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { store } from '@/store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ThemeLayout>{children}</ThemeLayout>
    </Provider>
  );
}

function ThemeLayout({ children }) {
  const dispatch = useDispatch(); // To dispatch actions
  const theme = useSelector((state) => state.theme.theme); // Access the theme from Redux

  // Check if localStorage has a theme set, and if it's different, dispatch it
  if (typeof window !== 'undefined' && !theme) {
    const savedTheme = localStorage.getItem('chat-theme');
    if (savedTheme) {
      dispatch(setTheme(savedTheme)); // Set the theme from localStorage
    }
  }

  // Dynamically set theme classes based on the selected theme
  const themeClass = theme === 'coffee' ? 'bg-coffee' : theme;

  return (
    <html lang="en" data-theme={themeClass}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
