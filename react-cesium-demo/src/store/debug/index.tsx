import { useEffect } from 'react'
import { useRecoilSnapshot } from 'recoil'

export const DebugObserver = () => {
    const snapshot = useRecoilSnapshot()

    useEffect(() => {
        console.log('The follow atoms were: modified: ');
        for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
            console.log(node.key, snapshot.getLoadable(node))
        }
    }, [snapshot])

    return null
}