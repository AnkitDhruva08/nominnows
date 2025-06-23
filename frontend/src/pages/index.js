import { useEffect, useState } from 'react';

export default function HomePage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch('http://127.0.0.1:8000/');
        const data = await res.json();
        setMessage(data.message);
      } catch (err) {
        console.error('Error fetching message:', err);
        setMessage('Failed to load message');
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <main className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl text-center max-w-md w-full transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          {message}
        </h1>
      </main>
    </div>
  );
}
