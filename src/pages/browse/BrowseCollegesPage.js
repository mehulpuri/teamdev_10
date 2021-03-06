import React, { useEffect, useState } from 'react'
import { useContract, useSigner } from 'wagmi'
import Collegecard from '../../components/Collegecard'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../components/contract/contract';

const BrowseCollegesPage = () => {
  const [loading,setLoading] = useState(false);  
  const [allColleges,setAllColleges] = useState([]);
  const {data:signer} = useSigner();

  const contract = useContract({
    addressOrName: CONTRACT_ADDRESS,
    contractInterface: CONTRACT_ABI,
    signerOrProvider:signer
  })  

  const getAllColleges = async () => {
    setLoading(true);
    try{
      const _data= await contract.getAllColleges();
      console.log(_data);
      setAllColleges(_data);
    } catch(err){
      console.log(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    if(signer){
      getAllColleges();      
    }
  }, [signer])
  

  if(!signer){
    return <div className='h-[90vh] w-screen flex items-center justify-center'>Pleae Connect to your metamask wallet</div>
  }

  if(loading){
    return <div className='h-[90vh] w-screen flex items-center justify-center'>Loading...</div>
  }

  return (
    <div className='min-h-screen px-6 py-4 '>
      <h1 className='text-3xl mb-4 font-semibold'>Browse Registered Colleges</h1>
      <div className='flex'>
      {allColleges.map((data)=>(
        <Collegecard data={data}/>
      ))}
        </div>
    </div>
  )
}

export default BrowseCollegesPage