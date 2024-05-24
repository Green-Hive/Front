import { useParams } from "react-router-dom";
import { apiClient } from "../services/api";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { Link, Minus, NavArrowLeft, Plus } from "iconoir-react";
import { useSnackbarsContext } from "../context/snackbars.context";
import { useForm } from "react-hook-form";
import FullModal from "../components/fullModal";
import moment from "moment";

type FormData = {
    name: string;
    description: string;
};


function CreateHiveModal(props: {setOpen: any, getHives: any, userId: string}) {
    const {pushSnackbar} = useSnackbarsContext()


    const { register, handleSubmit } = useForm<FormData>({
        mode: "onChange",
      });
    const onSubmit = handleSubmit(async (data) => {
        const { description, name } = data;
            console.log("la")
        try {
          await apiClient.createHive(name, description, props.userId)
          pushSnackbar({
            type: "success",
            message: "You have been successfully registered.",
          });
            props.getHives();
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
                <p className="text-white text-xl">Create a new hive</p>
                <p className="text-white text-xl hover:cursor-pointer" onClick={() => props.setOpen(false)}>x</p>
            </div>
            <div>
                <form className="flex flex-col gap-6 text-white mt-10" onSubmit={onSubmit}>
                    <div className="text-left">
                        <label className="text-sm font-bold text-left block">Name</label>
                        <input
                            {...register("name", { required: true })}
                            name="email"
                            type="text"
                            className="w-full p-2 border border-grey-300 rounded mt-1 text-black"
                        />
                        
                    </div>
                    <div className="text-left">
                    <label className="text-sm font-bold text-left block">Description</label>
                    <input
                        {...register("description", { required: false })}
                        name="name"
                        type="text"
                        className="w-full p-2 border border-grey-300 rounded mt-1 text-black"
                    />
                    </div>
                    <button className="mt-5 w-full py-2 px-4 bg-greenOlive hover:bg-[#26300A] rounded-lg text-white mb-3">
                        Create hive
                    </button>
                </form>
            </div>
        </div>
    </FullModal>
    )
}

export default function AdminUserPage() {
    const { id } = useParams();
    const [hives, setHives] = useState<any>([]);
    const [user, setUser] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);

    const getUserHives = async () => {
        if (id) {
            const res = await apiClient.getUserHive(id);
            const user = await apiClient.getUser(id);
            if (res && res.data && res.data.length && user && user.data) {
                setHives(res.data);
                setUser(user.data);
            }
        }
      };

      useEffect(() => {
        if (id)
            getUserHives();
      }, [id]);
    
    if (!hives || !user) return <Spinner />
    return (
        <div className="mt-6 px-4 sm:px-6 lg:px-8 flex flex-col gap">
            <div className="mb-5 text-gray-200">
                <button className="flex items-center gap-3">
                    <NavArrowLeft width={20} height={20} strokeWidth={2}></NavArrowLeft>
                    <p>Back</p>
                </button>
            </div>
          {open && id && <CreateHiveModal setOpen={setOpen} getHives={getUserHives} userId={id}/>} 
            <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-5">
                <div className="flex justify-between items-center border-b border-gray-300/20 pb-5">
                    <div className="flex gap-4 items-center text-white">
                        <div className="bg-[#3C4C10] text-xl rounded px-2 py-1">
                            <p>{user.name[0].toLocaleUpperCase() + user.name[1].toLocaleUpperCase()}</p>
                        </div>
                        <p className="text-xl">{user.name.toLocaleUpperCase()}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button className="bg-[#3C4C10] text-white px-5 py-1 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Link className="w-4 h-4" strokeWidth={3}/>Link to an existing hive</button>
                        <button className="bg-[#3C4C10] text-white px-5 py-1 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Plus className="w-4 h-4" strokeWidth={3}/>Create a new hive</button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <tbody className="text-white w-full flex flex-col gap-5">
                    {hives.map((hive: {name: string, description: string, createdAt: string}) => (
                        <div key={user.id} className="p-5 bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg h-60 w-full">
                            <p>{user.email}</p>
                            <p>{hive.name}</p>
                            <p>{moment(hive.createdAt).format("DD/MM/YYYY")}</p>
                            <button className="bg-[#3C4C10] text-white px-5 py-1 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Minus className="w-4 h-4" strokeWidth={3}/>Remove access</button>
                            <button className="bg-red-600 text-white px-5 py-1 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Minus className="w-4 h-4" strokeWidth={3}/>Delete hive</button>
                        </div>
                    ))}
                </tbody>
            </div>
        </div>
    );
}