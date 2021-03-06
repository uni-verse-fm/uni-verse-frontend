import React from "react";
import { imageSource } from "../../common/constants";
import { isoDateYear } from "../../utils/dateUtils";

const ReleaseCard = ({ release }) => {
  return (
    <div className="cursor-pointer rounded-lg hover:scale-[1.03] mb-1 p-2 bg-opacity-50 bg-gry hover:bg-gry hover:bg-opacity-70">
      <img
        className="md:container object-cover md:mx-auto rounded-lg w-full h-28"
        src={
          release?.coverName
            ? imageSource + release?.coverName
            : "/Playlist.png"
        }
        alt="playlist"
      />
      <h2 className="pt-1 pl-1 pb-2 text-segrn text-md">{release?.title}</h2>
      <h1 className="pl-1 text-gry text-sm ">
        {release?.author?.username} {isoDateYear(release?.createdAt)}
      </h1>
    </div>
  );
};
export default ReleaseCard;
