import { useEffect, useState } from "react";
import { apiClient } from "../services/api";
import FullModal from "../components/fullModal";
import { Plus } from "iconoir-react";
import { useForm, useFormState } from "react-hook-form";
import { useSnackbarsContext } from "../context/snackbars.context";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";

type FormData = {
    email: string;
    password: string;
    name: string;
};

function CreateUserModal(props: {setOpen: any, getUsers: any}) {
    const {pushSnackbar} = useSnackbarsContext()

    const { register, handleSubmit, control } = useForm<FormData>({
        mode: "onChange",
      });
    const { errors } = useFormState({ control });
    const onSubmit = handleSubmit(async (data) => {
        const { email, password, name } = data;
        
        try {
          await apiClient.createUser(name, email, password)
          pushSnackbar({
            type: "success",
            message: "You have been successfully registered.",
          });
            props.getUsers();
            props.setOpen(false);
        } catch (error) {
          pushSnackbar({
            type: "error",
            message: "Unable to register, please try again.",
          });
          console.error(error);
        }
      });

    return (
        <FullModal>
        <div className="p-8 flex flex-col">
            <div className="flex justify-between items-center">
                <p className="text-white text-xl">Create a new user</p>
                <p className="text-white text-xl hover:cursor-pointer" onClick={() => props.setOpen(false)}>x</p>
            </div>
            <div>
                <form className="flex flex-col gap-6 text-white mt-10" onSubmit={onSubmit}>
                    <div className="text-left">
                        <label className="text-sm font-bold text-left block">Email</label>
                        <input
                            {...register("email", { required: true })}
                            name="email"
                            type="text"
                            className="w-full p-2 border border-grey-300 rounded mt-1 text-black"
                        />
                        {errors.email && (
                            <span className="text-red-500">Email is invalid</span>
                        )}
                    </div>
                    <div className="text-left">
                    <label className="text-sm font-bold text-left block">Name</label>
                    <input
                        {...register("name", { required: true })}
                        name="name"
                        type="text"
                        className="w-full p-2 border border-grey-300 rounded mt-1 text-black"
                    />
                    {errors.name && (
                        <span className="text-red-500">name is invalid</span>
                    )}
                    </div>
                    <div>
                    <label className="text-sm font-bold text-left block">
                        Password
                    </label>
                    <div className="relative flex items-center mt-1">
                        <input
                        {...register("password", { required: true })}
                        name="password"
                        type={"text"}
                        className="w-full p-2 border border-grey-300 rounded text-black"
                        />
                    </div>
                    </div>
                    <button className="mt-5 w-full py-2 px-4 bg-greenOlive hover:bg-[#26300A] rounded-lg text-white mb-3">
                        Create user
                    </button>
                </form>
            </div>
        </div>
    </FullModal>
    )
}
  

export default function AdminPage() {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()
    const [users, setUsers] = useState<any>([]);

    const getUsers = async () => {
        const res = await apiClient.getUsers();
        if (res && res.data && res.data.length) {
          setUsers(res.data);
        }
      };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="mt-10 px-4 sm:px-6 lg:px-8 flex flex-col gap container mx-auto">
            <p className="text-white text-3xl mb-7">{"Admin panel"}</p>
            {open && 
                <CreateUserModal getUsers={() => getUsers()} setOpen={(e:boolean) => setOpen(e)}/>
            }
            <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-4">
                <div className="flex justify-between items-center border-b border-gray-300/20 pb-3">
                    <p className="text-lg font-semibold text-white">Users registered</p>
                    <button className="bg-[#3C4C10] text-white px-5 py-2 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Plus className="w-4 h-4" strokeWidth={3}/>Create user</button>
                </div>
                {!users.length 
                    ? 
                    <div className="w-full flex items-center justify-center h-20"><Spinner /></div>
                    :
                <div>
                    <table className="w-full">
                        <thead className="">
                            <tr className="text-xs text-gray-200/80">
                                <th className="text-left"></th>
                                <th className="text-left"></th>
                                <th className="text-left"></th>
                            </tr>
                        </thead>
                        <tbody className="text-white w-full">
                            {users.map((user: {name: string, role: string, email: string, id: string}) => (
                                <tr key={user.id} className="border-b border-gray-300/10 h-14 w-full hover:cursor-pointer hover:bg-[#3C4C10]/30"
                                onClick={() => navigate(`/admin/${user.id}`)}>
                                    <td>
                                        <div className="flex gap-4 items-center pl-3">
                                            <div className="bg-[#3C4C10]/70 border border-gray-300/20 rounded px-2 py-1">
                                                <p>{user.name[0].toLocaleUpperCase() + user.name[1].toLocaleUpperCase()}</p>
                                            </div>
                                            <p>
                                            {user.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    );
}