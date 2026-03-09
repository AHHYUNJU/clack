import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/features/auth/store'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const signUp = useAuthStore((state) => state.signUp)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await signUp(email, password, name)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-center px-4">

      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-[#3f0e40]">Clack</h1>
        <p className="mt-3 text-xl font-medium text-gray-800">새 계정을 만드세요</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="홍길동"
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3f0e40] focus:ring-1 focus:ring-[#3f0e40] transition-colors"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">이메일</label>
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
            <label className="text-sm font-semibold text-gray-700">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6자 이상 입력"
              className="border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:border-[#3f0e40] focus:ring-1 focus:ring-[#3f0e40] transition-colors"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-[#3f0e40] text-white rounded py-2 text-sm font-semibold hover:bg-[#340d36] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </button>

        </form>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/login" className="text-[#3f0e40] font-semibold hover:underline">
          로그인
        </Link>
      </p>

    </div>
  )
}
