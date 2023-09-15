import React, {useState} from 'react'
import {useForm} from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  remember: boolean;
};

const login: React.FC = () => {


  const [name,setName] = useState("Kretes")
  const { register, handleSubmit } = useForm<FormData>();
  


  const onSubmit = handleSubmit(({email, password, remember}) => {
    console.log(email, password, remember);
  })

  return (
    <div className="bg-black h-screen w-full flex flex-row ">
      <div className="w-[60%] bg-blue-200">

      </div>
      <div className="w-[40%] bg-[#3C4C10] flex flex-col justify-center ">
        <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label  className="text-sm font-bold text-left block">Email</label>
            <input 
             {...register("email")}
             name="email" type="text" className="w-full p-2 border border-grey-300 rounded mt-1 " />
          </div>
          <div>
            <label  className="text-sm font-bold text-left block">Password</label>
            <input {...register("password")}
            
            name="password" type="password" className="w-full p-2 border border-grey-300 rounded mt-1" />
          </div>
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                 {...register("remember")}
                 name="remember" type="checkbox" className="h-4 w-4 text-blue-300 rounded" />
                <label htmlFor="" className="ml-2 text-grey-600">Rememeber me</label>
              </div>
              <div>
                <a href="" className="font-medium text-sm text-blue-500">Forgot Password</a>
              </div>
            </div>
            <div className="mt-4">
              <button className="w-full py-2 px-4 bg-[#3C4C10] hover:bg-[#26300A] rounded-md text-white text-sm">Sign in</button>
            </div>
          </div>
        
        </form>
        </div>
      </div>

    </div>
  )
}

export default login