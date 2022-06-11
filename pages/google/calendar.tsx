
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
    const router = useRouter();
    const queryParameter = router.query
    const { code } = queryParameter

    const [events, setEvents] = useState<any[]>([])
    useEffect(() => {
        const query = (async (code: string) => {
            const data = await fetch(`/api/google/calendar?code=${code}`)
            const ret = await data.json()
            setEvents(ret.events);
        })
        code && query(code as string);
    }, [code])

    return (
        <>
            {events?.length ? (<>
                {events.map((e, i) => (<div key={i}>
                    {JSON.stringify(e)}
                </div>))}

            </>) : (<>イベントはみつかりませんでした。</>)}
        </>
    )
}

export default Home
