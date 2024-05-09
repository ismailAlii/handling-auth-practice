import { useEffect } from 'react'
import AuthForm from '../components/AuthForm'
import { useNavigate, json, redirect } from 'react-router-dom'

function AuthenticationPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const query = new URLSearchParams(document.location.search)
    const mode = query.get('mode')
    if (!mode) {
      navigate('?mode=login')
    }
  }, [navigate])
  return <AuthForm />
}

export default AuthenticationPage

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams
  const mode = searchParams.get('mode') || 'login'

  const formData = await request.formData()
  const authData = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  if (mode !== 'login' && mode !== 'signup') {
    throw json({ message: 'Unsupported mode.' }, { status: 422 })
  }

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authData),
  })

  if (response.status === 422 || response.status === 401) {
    return response
  }

  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  const resData = await response.json()
  const token = resData.token
  localStorage.setItem('token', token)

  return redirect('/')
}
