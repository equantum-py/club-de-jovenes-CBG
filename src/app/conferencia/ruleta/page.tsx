import type { Metadata } from "next";
import { hasAdminSession } from "@/lib/admin-auth";
import ConferenceWheel from "@/components/conferencia/ConferenceWheel";
import ConferenceWheelLogin from "@/components/conferencia/ConferenceWheelLogin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {title:"Ruleta bíblica | Conferencia de Jóvenes",robots:{index:false,follow:false}};
export default function ConferenceWheelPage() {
  return hasAdminSession() ? <ConferenceWheel/> : <ConferenceWheelLogin/>;
}
