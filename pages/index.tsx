import type { NextPage } from 'next';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useState } from 'react';

const AuthButton = ({ session }: { session: Session | null }) => {
  return <>{session ? (<button onClick={() => signOut()}>Sign Out</button >) : (<button onClick={() => signIn()}>Sign In</button>)}</>
}

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const [url, setUrl] = useState<string>();
  if (status === 'loading') {
    return null;
  }

  const generateUrl = async () => {
    const data = await fetch(`/api/google/auth`);
    const ret = await data.json()
    setUrl(ret.url);
  }
  return (
    <>
      <p>{session ? `Singned in as ${session?.user?.name}` : `Signed out.`}</p>
      <AuthButton session={session} />
      <button onClick={async () => {
        await generateUrl()
      }}>Generate Auth URL</button>
      {
        url && <a href={url}>ぐーぐる認証！</a>
      }
    </>
  )
}

export default Home
