import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useMutation } from "react-query";
import { changeProfilePicture } from "../../api/UserAPI";
import {
  Extensions,
  imageSource,
  MAX_IMAGE_SIZE,
} from "../../common/constants";
import { IProfileScreen, NotificationType } from "../../common/types";
import ArtistReleases from "../ArtistReleases";
import ResourcesPacks from "../ResourcesPacks";
import { notify } from "../Notifications";
import Playlists from "../PLaylists";
import UploadImageDisplayer from "../UploadImageDisplayer";
import ResetPasswordModal from "../ResetPasswordModal";
import TrackRow from "../SearchBar/TrackRow";
import { Pages, Track } from "../../common/types";
import { useRouter } from "next/router";
import SendMessage from "../SendMessage";

const imageProps = {
  defaultImageSrc: "/profile.jpg",
  size: 56,
  fileExtensions: Extensions.image,
};

const ProfileScreen = ({
  user,
  releases,
  isMe,
  resourcesPacks,
  hotTracks,
  playlists,
}: IProfileScreen) => {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };
  const handleCloseResetPasswordModal = () => {
    setShowForm(false);
  };

  const [showFormSendMessage, setShowFormSendMessage] = useState(false);
  const handleShowFormSendMessage = () => setShowFormSendMessage(true);
  const handleCloseFormSendMessage = () => setShowFormSendMessage(false);

  const [isValid, setIsValid] = useState(true);

  const onClickDisplayTrack = (track: Track) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(track) },
    });
  };

  const { mutate } = useMutation("uploadProfilePicture", changeProfilePicture, {
    onError: () => {
      notify(`Can't upload profile picture`, NotificationType.ERROR);
    },
    onSuccess: (res) => {
      if (res.status !== 201) {
        notify(res.data.message, NotificationType.ERROR);
      } else {
        const message = "Profile picture uploaded";
        notify(message, NotificationType.SUCCESS);
      }
    },
    retry: 2,
  });

  const handleImageUpload = (image: File) => {
    if (image.size > MAX_IMAGE_SIZE) {
      setIsValid(false);
    } else {
      setIsValid(true);
      var bodyFormData = new FormData();
      bodyFormData.append("file", image, image.name);
      mutate(bodyFormData);
    }
  };

  return (
    <div
      className={`bg-drk w-full h-full flex flex-col overflow-y-scroll overflow-x-hidden p-20`}
    >
      <div
        className={`text-start flex justify-start flex-col items-center w-full h-full`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl font-bold not-italic text-grn m-2">
              {user.username}
            </h1>
            <h2 className="text-lg font-bold not-italic text-wht m-2">
              {user.email}
            </h2>
          </div>
          {isMe ? (
            <UploadImageDisplayer
              {...imageProps}
              profilePicture={
                user.profilePicture
                  ? imageSource + user.profilePicture
                  : imageProps.defaultImageSrc
              }
              maxFileSize="10"
              setFieldValue={handleImageUpload}
              disable={true}
            />
          ) : (
            <img
              src={
                user.profilePicture
                  ? imageSource + user.profilePicture
                  : imageProps.defaultImageSrc
              }
              className={`md:mx-auto object-cover h-56 w-56 rounded-xl`}
              alt="image to upload"
            />
          )}
          {!isValid ? <div className="text-rd">File is too large</div> : null}
          {user.id && isMe && (
            <button
              onClick={handleShowForm}
              className="font-medium text-wht text-md rounded-full border-2 border-grn px-2 h-7 hover:bg-grn hover:bg-opacity-25"
            >
              <span>Password</span>
              <FontAwesomeIcon
                className="cursor-pointer ml-2 hover:scale-[1.40] hover:text-gry text-wht"
                icon={faPen}
              />
            </button>
          )}
          {user.id && user.stripeAccountId && !isMe && (
            <button className="mt-4 text-md text-grn bg-wht rounded-full px-2 h-7 hover:bg-grn hover:text-wht hover:bg-opacity-25">
              <span>Donate</span>
            </button>
          )}
          {user.id && !isMe && (
            <button
              onClick={handleShowFormSendMessage}
              className="mt-4 text-md text-grn bg-wht rounded-full px-2 h-7 hover:bg-grn hover:text-wht hover:bg-opacity-25"
            >
              <span>Contact</span>
            </button>
          )}
        </div>
      </div>
      {hotTracks.length > 0 && (
        <>
          <h2 className="font-bold not-italic text-wht text-xl mt-10">
            Populaires
          </h2>
          <div className="flex flex-row grow w-full h-auto">
            <div className="grow m-2 rounded-xl">
              <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
                {hotTracks.map((track, index) => (
                  <li key={index}>
                    <TrackRow
                      track={track as any}
                      onClickDisplayTrack={onClickDisplayTrack(track as any)}
                      disableHover={true}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="text-start justify-start items-start w-full h-full">
        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Releases
        </h2>
        <div className="-ml-4 ">
          <ArtistReleases data={releases} />
        </div>

        <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5 ">
          Playlists
        </h2>

        <div className="-ml-4 ">
          <Playlists
            playlists={playlists}
            modalDisplay={false}
            handleShowPlaylistContent={undefined}
          />
        </div>

        {user.id && (
          <div className="mb-5">
            <h2 className="font-bold not-italic text-wht text-xl mt-10 mb-5">
              ResoucesPacks
            </h2>
            <div className="-ml-4 ">
              <ResourcesPacks packs={resourcesPacks} />
            </div>
          </div>
        )}
      </div>
      <ResetPasswordModal
        showModal={showForm}
        handleCloseDialog={handleCloseResetPasswordModal}
      />
      <SendMessage
        showModal={showFormSendMessage}
        handleCloseDialog={handleCloseFormSendMessage}
        dest={user.id}
      />
    </div>
  );
};

export default ProfileScreen;
