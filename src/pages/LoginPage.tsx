import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signIn = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center px-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3f0e40]">Clack</h1>
        <p className="mt-3 text-xl font-medium text-gray-800">
          워크스페이스에 로그인하세요
        </p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3f0e40] focus:ring-1 focus:ring-[#3f0e40] transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3f0e40] focus:ring-1 focus:ring-[#3f0e40] transition-colors"
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-[#3f0e40] text-white rounded py-2 text-sm font-semibold hover:bg-[#340d36] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        계정이 없으신가요?{' '}
        <Link
          to="/signup"
          className="text-[#3f0e40] font-semibold hover:underline"
        >
          회원가입
        </Link>
      </p>
    </div>
  );
}
