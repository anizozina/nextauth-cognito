import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from "next-auth/react";

const AuthButton = ({ session }: { session: Session | null}) => {
  return <>{session ? (<button onClick={() => signOut()}>Sign Out</button >) : (<button onClick={() => signIn()}>Sign In</button>)}</>

}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <p>{session ? `Singned in as ${session?.user?.name}` : `Signed out.`}</p>
      <AuthButton session={session} />
    </>
  )
}

export default Home
