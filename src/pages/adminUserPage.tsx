import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../services/api";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { Link, Minus, NavArrowLeft, NavArrowRight, Plus, WarningTriangle, XCoordinate  } from "iconoir-react";
import { useSnackbarsContext } from "../context/snackbars.context";
import Hive2 from "../assets/hive2.png";
import Modal from "../components/modal";
import CreateHiveModal from "../components/createHiveModal";
import LinkHiveModal from "../components/linkHiveModal";

function DeleteHiveModal(props: {hive: {id: string, name: string, description: string, createdAt: string}, getHives: any, setOpen: any}) {
    const {pushSnackbar} = useSnackbarsContext();

    const onCancel = async () => {
        try {
            await apiClient.deleteHive(props.hive.id).then(() => {
                props.getHives();
                props.setOpen(false);
                pushSnackbar({
                    type: "success",
                    message: "Hive successfully deleted.",
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
        <div>
            <Modal>
                <div className="w-full flex justify-end px-6 mt-2" onClick={() => props.setOpen(false)}>
                    <XCoordinate />
                </div>
                <div className="flex flex-col items-center text-center p-6 px-20">
                    <div className="text-error bg-red-500/70 rounded-full p-4 mb-3">
                        <WarningTriangle strokeWidth={2.2} width={30} height={30} />
                        </div>
                        <p className="font-bold text-lg text-gray-100 mb-1">Are you sure ?</p>
                        <p className="text-gray-300/70 text-base">
                        This action can't be undone. Your hive and all his data will be deleted.
                        </p>
                    </div>
                    <div className="flex flex-col w-full gap-3 px-6 pb-8">
                        <button
                        className="w-full bg-red-700 text-white py-2 rounded-lg"
                        onClick={() => onCancel()}
                        >
                        Remove this hive
                        </button>
                    </div>
            </Modal>
        </div>
    )
}

function Hive(props: {hive: {id: string, name: string, description: string, createdAt: string, userHasAccess: boolean}, setOpen: any, getHives: any}) {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const {pushSnackbar} = useSnackbarsContext();

    const onGiveAccessToUser = async () => {
        try {
            await apiClient.giveAccessToHive(props.hive.id).then(() => {
                props.getHives();
                pushSnackbar({
                    type: "success",
                    message: "Access granted.",
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

    const onRemoveAccessToUser = async () => {
        try {
            await apiClient.removeAccessToHive(props.hive.id).then(() => {
                props.getHives();
                pushSnackbar({
                    type: "success",
                    message: "Access removed.",
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
        <div key={props.hive.id} className="p-5 bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg h-56 w-full flex items-center gap-8">
            {deleteOpen && <DeleteHiveModal hive={props.hive} getHives={() => props.getHives()} setOpen={() => setDeleteOpen(false)}/>}
            <div className="w-52 h-52">
                <img
                    src={Hive2}
                    alt="Bee"
                    className="w-full h-full"
                />
            </div>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-2xl">{props.hive.name}</p>
                    <div className="py-1 px-3 border border-gray-300/20 rounded w-fit text-sm mt-1 mb-1">
                        <p>{props.hive.description}</p>
                    </div>
                    <div>

                    {props.hive.userHasAccess ? 
                        <button className="text-red-400 py-2 rounded flex items-center justify-center gap-2 text-sm" onClick={() => onRemoveAccessToUser()}><Minus className="w-4 h-4" strokeWidth={3}/>Remove access</button>
                        : 
                        <button className="text-green-500 py-2 rounded flex items-center justify-center gap-2 text-sm" onClick={() => onGiveAccessToUser()}>Give access <NavArrowRight className="w-3 h-3" strokeWidth={3}/></button>
                    }
                    </div>

                </div>
                <div className="flex gap-5">
                    <button className="shadow bg-red-700 text-white px-5 py-2 rounded flex items-center justify-center gap-2 text-sm" onClick={() => setDeleteOpen(true)}>Delete this hive</button>
                </div>
            </div>
        </div>
    )
}

export default function AdminUserPage() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [hives, setHives] = useState<any>([]);
    const [user, setUser] = useState<any>();
    const [open, setOpen] = useState<boolean>(false);
    const [linkOpen, setLinkOpen] = useState<boolean>(false);

    const getUserHives = async () => {
        if (id) {
            const res = await apiClient.getUserHive(id);
            const user = await apiClient.getUser(id);
            if (res && res.data && user && user.data) {
                setHives(res.data);
                setUser(user.data);
            }
        }
      };

      useEffect(() => {
        if (id)
            getUserHives();
      }, [id]);
    
    if (!user) return <div className="w-full flex items-center justify-center h-screen"><Spinner /></div>
    return (
        <div className="mt-6 px-4 sm:px-6 lg:px-8 flex flex-col gap container mx-auto">
            <div className="flex flex-col gap-7 mb-6">
                <p className="text-white text-3xl">{"Admin panel > User hives"}</p>
                <div className="text-gray-100/80 border rounded-lg border-gray-400/80 px-3 py-2 w-fit hover:cursor-pointer" onClick={() => navigate(-1)}>
                    <button className="flex items-center gap-3">
                        <NavArrowLeft width={20} height={20} strokeWidth={2}></NavArrowLeft>
                        <p>Back</p>
                    </button>
                </div>
            </div>
            {linkOpen && id && <LinkHiveModal setOpen={setLinkOpen} getHives={getUserHives} userId={id} userHives={hives.map((el:any) => el.id)}/>}
          {open && id && <CreateHiveModal setOpen={setOpen} getHives={getUserHives} userId={id}/>} 
            <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-5">
                <p className="text-white text-lg mb-4">User</p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center text-white">
                        <div className="bg-[#3C4C10]/70 border border-gray-300/20 text-xl rounded px-2 py-1">
                            <p>{user.name[0].toLocaleUpperCase() + user.name[1].toLocaleUpperCase()}</p>
                        </div>
                        <p className="text-xl">{user.name}</p>
                    </div>
                    <div className="flex gap-5 items-center">
                        <button className="shadow border-2 border-[#3C4C10] text-white px-5 py-2 rounded flex items-center justify-center gap-2" onClick={() => setLinkOpen(true)}><Link className="w-4 h-4" strokeWidth={3}/>Link an existing hive</button>
                        <button className="shadow bg-[#3C4C10] text-white px-5 py-2 rounded flex items-center justify-center gap-2" onClick={() => setOpen(true)}><Plus className="w-4 h-4" strokeWidth={3}/>Create a new hive</button>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                {hives.length === 0 && <p className="text-gray-300 text-center">No hives found for this user.</p>}
                <tbody className="text-white w-full grid xl:grid-cols-2 grid-cols-1 justify-between gap-5">
                    {hives.map((hive: {id: string, name: string, description: string, createdAt: string, userHasAccess: boolean}) => (
                        <Hive hive={hive} setOpen={(e:any) => setOpen(e)} getHives={() => getUserHives()}/>
                    ))}
                </tbody>
            </div>
        </div>
    );
}