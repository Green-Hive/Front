import { InfoEmpty,  WarningTriangle } from "iconoir-react";
import { useAuth } from "../context/AuthContext";
import ws from "../services/webSocket.ts";

// A LINKER AVEC LE FRONT JUSTE UN CONSOLE.LOG POUR LE MOMENT
ws.onmessage = (event) => {
  const alert = JSON.parse(event.data);
  console.log('Received alert:', alert);
};

function NotificationError(props: { title: string; description: string }) {
  return (
    <div className="bg-red-300/80 text-red-800 flex justify-between py-3 px-5 rounded-lg items-start">
      <div className="flex gap-6 items-center">
        <WarningTriangle width={35} height={35} strokeWidth={2} />
        <div className="flex flex-col">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
      <p className="text-sm underline">21 March, 11h30</p>
    </div>
  );
}

function NotificationInfo(props: { title: string; description: string }) {
  return (
    <div className="bg-[#E5D26F] text-yellow-800 flex justify-between py-3 px-5 rounded-lg items-start">
      <div className="flex gap-6 items-center">
        <InfoEmpty width={32} height={32} strokeWidth={2} />
        <div className="flex flex-col">
          <p className="font-semibold">{props.title}</p>
          <p className="text-sm">{props.description}</p>
        </div>
      </div>
      <p className="text-sm underline">Today, 13h30</p>
    </div>
  );
}

export default function NotificationsPage() {
  const { user } = useAuth();

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
        <div className="flex flex-col gap-5 mt-5">
          <NotificationError
            title={"Baisse anormale de température"}
            description="La température de votre ruche 'Hive de demo' a baissé de 8 degrès durant les 5 dernières heures."
          />
          <NotificationError
            title={"Poids de la ruche élevé"}
            description="Le poids de votre ruche 'Hive de demo' est de 22kg, vous devriez vous en occuper."
          />
          <NotificationInfo
            title={"Variations de températures exterieures importantes"}
            description="Des phénomènes météorologiques entrainant de fortes variation de températures vont se produire prochainement."
          />
        </div>
      </div>
    </div>
  );
}
