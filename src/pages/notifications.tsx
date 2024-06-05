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

function NotificationError(props: { title: string; description: string; date: any }) {
  const formattedDate = format(new Date(props.date), 'dd/MM/yyyy HH:mm:ss');
  return (
    <div className="bg-red-300/80 text-red-800 flex justify-between py-3 px-5 rounded-lg items-start">
      <div className="flex gap-6 items-center">
        <WarningTriangle width={35} height={35} strokeWidth={2}/>
        <div className="flex flex-col">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
      <p className="text-sm underline">{formattedDate}</p>
    </div>
  );
}

function NotificationWarning(props: { title: string; description: string; date: any }) {
  return (
    <div className="bg-[#E5D26F] text-yellow-800 flex justify-between py-3 px-5 rounded-lg items-start">
      <div className="flex gap-6 items-center">
        <InfoEmpty width={32} height={32} strokeWidth={2}/>
        <div className="flex flex-col">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
      <p className="text-sm underline">Today, 13h30</p>
    </div>
  );
}

function NotificationInfo(props: { title: string; description: string; date: any }) {
  return (
    <div className="bg-blue-200 text-blue-700 flex justify-between py-3 px-5 rounded-lg items-start">
      <div className="flex gap-6 items-center">
        <InfoEmpty width={32} height={32} strokeWidth={2}/>
        <div className="flex flex-col">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
      <p className="text-sm underline">{props.date}</p>
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
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]) as any;

  useEffect(() => {
    const fetchAlerts = async () => {
      if (user && user.hive && user.hive.length > 0) {
        try {
          const allAlerts = await getAllAlerts(user);
          setAlerts(allAlerts);
          setLoading(false); // Indiquer que le chargement est terminé
        } catch (error) {
          console.error('An error occurred while fetching alerts:', error);
          setLoading(false); // Indiquer que le chargement est terminé, même en cas d'erreur
        }
      }
    };
    fetchAlerts();

    // Subscribe to WebSocket event
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

  useEffect(() => {
    console.log(alerts)
  }, [alerts]);

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
      <div className="bg-Light-gray dark:bg-[#E5E5E5] rounded-lg shadow-lg p-6">
        <p className="text-lg font-semibold text-white">Alerts</p>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            {/* Afficher un loader pendant le chargement */}
            CHARGEMENT
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
                    />
                  )}
                  {alert.severity === AlertSeverity.WARNING && (
                    <NotificationWarning
                      title={alert.type}
                      description={alert.message}
                      date={alert.createdAt}
                    />
                  )}
                  {alert.severity === AlertSeverity.INFO && (
                    <NotificationInfo
                      title={alert.type}
                      description={alert.message}
                      date={alert.createdAt}
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

