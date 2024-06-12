import { useForm } from "react-hook-form";
import { useSnackbarsContext } from "../context/snackbars.context";
import { apiClient } from "../services/api";
import FullModal from "./fullModal";

type FormData = {
    name: string;
    description: string;
};

export default function CreateHiveModal(props: {setOpen: any, getHives: any, userId: string}) {
    const {pushSnackbar} = useSnackbarsContext()

    const { register, handleSubmit } = useForm<FormData>({
        mode: "onChange",
      });
    const onSubmit = handleSubmit(async (data) => {
        const { description, name } = data;
        try {
          await apiClient.createHive(name, description, props.userId)
          pushSnackbar({
            type: "success",
            message: "Hive created.",
          });
            props.getHives();
            props.setOpen(false);
        } catch (error) {
          pushSnackbar({
            type: "error",
            message: "Unable to create hive.",
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
                            name="name"
                            type="text"
                            className="w-full p-2 border border-grey-300 rounded mt-1 text-black"
                        />
                        
                    </div>
                    <div className="text-left">
                        <label className="text-sm font-bold text-left block">Description</label>
                        <input
                            {...register("description", { required: false })}
                            name="description"
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