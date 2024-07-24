import { useEffect, useState } from 'react'
import { getChannelAPI } from '@/apis/article'

function useChannel (){
  const [ channelList, setChannelList ] = useState([])
  useEffect(()=>{
    const channelData = async () => {
      const res = await getChannelAPI()
      setChannelList(res.data.channels)
    }
    channelData()
  },[])
  return { channelList }
}
export { useChannel }