import {
  Outlet,
  useLoaderData /* , useNavigation */,
  useSubmit,
} from 'react-router-dom'

import MainNavigation from '../components/MainNavigation'
import { useEffect } from 'react'
import { getRemainingTokenExpiration } from '../util/auth'

function RootLayout() {
  const token = useLoaderData()
  const submit = useSubmit()
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return
    }
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' })
    }, getRemainingTokenExpiration())
  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  )
}

export default RootLayout
