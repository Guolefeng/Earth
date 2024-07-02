import React, { useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import Roots from '@/routers'
import { baseApi } from '@/api'
import { dict, userInfo, rawdict } from '@/store/atom'
import '@/locales/'
import groupBy from 'lodash/groupBy'
import forEach from 'lodash/forEach'

function App() {
    const [dictVal, setDictVal] = useRecoilState(dict)
    const setRawdict = useSetRecoilState(rawdict)
    const user: any = useRecoilValue(userInfo)

    useEffect(() => {
        if (!user?.code) { return }
        getDictBatch()
    }, [user])

    const getDictBatch = () => {
        baseApi.getDictBatch().then((res: any) => {
            if (res.code === '0') {
                const rawdict = res.data
                setRawdict(rawdict)
                const batchDict = {
                    ...dictVal,
                }
                const groupData = groupBy(rawdict, 'dictId')
                forEach(groupData, (value, key) => {
                    if (value[0]?.dictSort) {
                        value.sort((a, b) => {
                            let value1 = a['dictSort']
                            let value2 = b['dictSort']
                            return value1 - value2
                        })
                    }
                    batchDict[key] = value || []
                })
                setDictVal(batchDict)
            }
        })
    }

    return <Roots />
}

export default App
