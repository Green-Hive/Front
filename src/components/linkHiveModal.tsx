import { useEffect, useState } from "react";
import { useSnackbarsContext } from "../context/snackbars.context";
import { apiClient } from "../services/api";
import FullModal from "./fullModal";

export default function LinkHiveModal(props: {setOpen: any, getHives: any, userId: string, userHives: string[]}) {
    const {pushSnackbar} = useSnackbarsContext()
    const [hives, setHives] = useState<any>([]);
    const [selected, setSelected] = useState<string>();

    const getAllHives = async () => {
        const res = await apiClient.getHives();
        if (res && res.data) {
            setHives(res.data);
        }
    }

    useEffect(() => {
        getAllHives();
    }, [])
    
    const onSubmit = async () => {
        if (!selected) return pushSnackbar({
            type: "error",
            message: "Please select a hive.",
          });
        try {
            await apiClient.linkHiveToUser(selected, props.userId).then(() => {
                props.getHives();
                props.setOpen(false);
                pushSnackbar({
                    type: "success",
                    message: "Hive linked successfully.",
                  });
            })
        } catch (error) {
            pushSnackbar({
                type: "error",
                message: "Error please try again.",
              });
            console.error(error);
        }
    }

    return (
        <FullModal>
        <div className="p-8 flex flex-col">
            <div className="flex justify-between items-center">
                <p className="text-white text-xl">Link to an existing hive</p>
                <p className="text-white text-xl hover:cursor-pointer" onClick={() => props.setOpen(false)}>x</p>
            </div>
            <div className="mt-8">
                <div className="text-left">
                    <label className="text-sm text-white font-bold text-left block">Select hive to link</label>
                    {
                        hives.filter((el:any) => !props.userHives.includes(el.id)).length === 0 ? <p className="text-gray-300/70 text-sm mt-2">No other hives can be linked to this user.</p>
                    :
                        <select
                            name="hiveId"
                            value={selected}
                            onChange={(e) => setSelected(e.target.value)}
                            className="w-full p-2 border border-grey-300 bg-[#E5E5E5] rounded mt-1 text-black"
                        >
                            <option value="">Please select an hive</option>
                            {hives.filter((el:any) => !props.userHives.includes(el.id)).map((hive: {id: string, name: string, description: string, createdAt: string, userHasAccess: boolean}) => (
                                <option onClick={() => setSelected(hive.id) } value={hive.id}>{hive.name}</option>
                            ))}
                        </select>}  
                </div>
                <button className="mt-5 w-full py-2 px-4 bg-greenOlive hover:bg-[#26300A] rounded-lg text-white mb-3" onClick={() => onSubmit()}>
                    Link to hive
                </button>
            </div>
        </div>
    </FullModal>
    )
}
