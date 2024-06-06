import {InfoEmpty, WarningTriangle} from "iconoir-react";
import {useAuth} from "../context/AuthContext";
import channel from "../services/webSocket.ts";
import {apiClient} from "../services/api.ts";
import {useEffect, useState} from "react";
import {format} from 'date-fns';

enum AlertSeverity {
  INFO = "INFO",
  WARNING = "WARNING",
  CRITICAL = "CRITICAL"
}

function NotificationError(props: { title: string; description: string; date: any; deleteFunction: () => void }) {
  const formattedDate = format(new Date(props.date), 'dd/MM/yyyy HH:mm:ss');
  return (
    <div className="bg-red-300/80 text-red-800 flex justify-between py-3 px-5 rounded-lg items-star relative">
      <div className={"flex justify-between w-11/12"}>
        <div className="flex gap-6 items-center">
          <WarningTriangle width={35} height={35} strokeWidth={2}/>
          <div className="flex flex-col">
            <p className="font-semibold">{props.title}</p>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
        <p className="text-sm underline">{formattedDate}</p>
      </div>
      <div
        className="absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer border-l-2 border-red-300 shadow-md transition-colors duration-300 ease-in-out hover:bg-red-300 hover:border-red-400 rounded-r-lg"
        onClick={props.deleteFunction}>
        <div className="text-black">X</div>
      </div>
    </div>
  );
}

function NotificationWarning(props: { title: string; description: string; date: any; deleteFunction: () => void }) {
  const formattedDate = format(new Date(props.date), 'dd/MM/yyyy HH:mm:ss');
  return (
    <div className="bg-amber-200 text-yellow-800 flex justify-between py-3 px-5 rounded-lg items-start relative">
      <div className={"flex justify-between w-11/12"}>
        <div className="flex gap-6 items-center">
          <InfoEmpty width={32} height={32} strokeWidth={2}/>
          <div className="flex flex-col">
            <p className="font-semibold">{props.title}</p>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
        <p className="text-sm underline">{formattedDate}</p>
      </div>
      <div
        className="absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer border-l-2 border-amber-300 shadow-md transition-colors duration-300 ease-in-out hover:bg-amber-300 hover:border-amber-400 rounded-r-lg"
        onClick={props.deleteFunction}>
        <div className="text-black">X</div>
      </div>
    </div>
  );
}

function NotificationInfo(props: { title: string; description: string; date: any; deleteFunction: () => void }) {
  const formattedDate = format(new Date(props.date), 'dd/MM/yyyy HH:mm:ss');
  return (
    <div className="bg-blue-200 text-blue-700 flex justify-between py-3 px-5 rounded-lg items-start relative">
      <div className={"flex justify-between w-11/12"}>
        <div className="flex gap-6 items-center">
          <InfoEmpty width={32} height={32} strokeWidth={2}/>
          <div className="flex flex-col">
            <p className="font-semibold">{props.title}</p>
            <p className="text-sm">{props.description}</p>
          </div>
        </div>
        <p className="text-sm underline my-auto flex justify-end">{formattedDate}</p>
      </div>
      <div
        className="absolute inset-y-0 right-0 flex items-center p-3 cursor-pointer border-l-2 border-blue-300 shadow-md transition-colors duration-300 ease-in-out hover:bg-blue-300 hover:border-blue-500 rounded-r-lg"
        onClick={props.deleteFunction}>
        <div className="text-black">X</div>
      </div>

    </div>
  );
}

const getAllAlerts = async (user: any) => {
  try {
    const allAlerts = [];
    for (const hive of user.hive) {
      const response = await apiClient.getAllAlertsFromHiveId(hive.id);
      allAlerts.push(...response.data);
    }
    return allAlerts;
  } catch (error) {
    console.error('An error occurred while fetching alerts:', error);
  }
};

export default function NotificationsPage() {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState([]) as any;
  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteAllAlerts = async () => {
    setDeleteLoading(true);
    try {
      for (const hive of user.hive) {
        await apiClient.deleteAllAlerts(hive.id);
        const newAlerts = await getAllAlerts(user);
        setAlerts(newAlerts);
      }
    } catch (error) {
      console.error('An error occurred while deleting alerts:', error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      await apiClient.deleteOneAlert(id);
      const newAlerts = alerts.filter((alert: any) => alert.id !== id);
      setAlerts(newAlerts);
    } catch (error) {
      console.error('An error occurred while deleting alert:', error);
    }
  }

  useEffect(() => {
    const fetchAlerts = async () => {
      if (user && user.hive && user.hive.length > 0) {
        setLoading(true);
        try {
          const allAlerts = await getAllAlerts(user);
          setAlerts(allAlerts);
          setLoading(false);
        } catch (error) {
          console.error('An error occurred while fetching alerts:', error);
          setLoading(false);
        }
      }
    };
    fetchAlerts();

    // WEB SOCKET RECEIVED ALERT UPDATE ALERTS
    channel.bind('my-event', async (data: never) => {
      console.log('Received alert:', data);
      try {
        const newAlerts = await getAllAlerts(user);
        setAlerts(newAlerts);
      } catch (error) {
        console.error('An error occurred while fetching alerts:', error);
      }
    });
  }, [user]);

  if (!user.notified)
    return (
      <div className="mt-6 px-4 sm:px-6 lg:px-8 flex flex-col gap">
        <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-6">
          <p className="text-lg font-semibold text-white">Alerts</p>
          <p className="mt-4 text-white/80">Your alerts are disabled</p>
        </div>
      </div>
    );

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8 flex flex-col gap">
      <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-6 ">
        <div className={"flex justify-between my-auto mb-10"}>
          <p className="text-lg font-semibold text-white flex my-auto">Alerts</p>
          <button
            onClick={() => deleteAllAlerts()}
            className={`py-2 px-4 rounded-full transition ${
              deleteLoading ? 'bg-gray-400 cursor-wait' : 'bg-blue-400 hover:bg-blue-500'
            } text-white`}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete all Notifications'}
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-24 text-xl text-white">
            LOADING...
          </div>
        ) : (
          <div className="flex flex-col gap-5 mt-5">
            {alerts.length > 0 ? (
              alerts.map((alert: any, index: number) => (
                <div key={index}>
                  {alert.severity === AlertSeverity.CRITICAL && (
                    <NotificationError
                      title={alert.type}
                      description={alert.message}
                      date={alert.createdAt}
                      deleteFunction={() => deleteAlert(alert.id)}
                    />
                  )}
                  {alert.severity === AlertSeverity.WARNING && (
                    <NotificationWarning
                      title={alert.type}
                      description={alert.message}
                      date={alert.createdAt}
                      deleteFunction={() => deleteAlert(alert.id)}
                    />
                  )}
                  {alert.severity === AlertSeverity.INFO && (
                    <NotificationInfo
                      title={alert.type}
                      description={alert.message}
                      date={alert.createdAt}
                      deleteFunction={() => deleteAlert(alert.id)}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-white/80">No alerts to display</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

