import { getSession, useSession } from "next-auth/react";
import React from "react";
import { useQuery } from "react-query";
import { reactQueryResponseHandler } from "../api/APIUtils";
import { me } from "../api/AuthAPI";
import { Messages } from "../common/constants";
import Spinner from "../components/Spinner";
import UploadResourcePackForm from "../components/UploadResourcePackForm";

export default function UploadResourcePackPage() {
  const { data: session } = useSession();

  const { status, data } = useQuery(
    "me",
    () => me().then((res) => res.data),

    {
      enabled: Boolean(session),
      ...reactQueryResponseHandler(),
    }
  );
  return (
    <div className="bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden">
      <div className="w-full h-full">
        {status === "error" ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-rd whitespace-nowrap">{Messages.ERROR_LOAD}</h1>
          </div>
        ) : status === "loading" ? (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <UploadResourcePackForm me={data} />
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
