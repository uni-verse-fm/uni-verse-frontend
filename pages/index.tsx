import { useRouter } from "next/router";
import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { adminLogin } from "../api/AdminAPI";
import { hotTracks, hotReleases } from "../api/ViewsAPI";
import { hotCommentedTracks } from "../api/CommentAPI";
import { HotViews, ILogin, Pages, Track } from "../common/types";
import TrackRow from "../components/SearchBar/TrackRow";
import ReleaseRow from "../components/SearchBar/ReleaseRow";

const today = new Date();
const lastWeek: Date = new Date(new Date().setDate(today.getDate() - 7));
const lastMonth: Date = new Date(new Date().setDate(today.getDate() - 30));
const lastYear: Date = new Date(new Date().setDate(today.getDate() - 365));

const StatsWrapper = ({ query, title, children }) => {
  return (
    <div className="grow m-2 rounded-xl p-4">
      <h1 className="text-grn">{title}</h1>
      {query.status === "success" && query.data.length > 0 ? (
        <ul className="mt-2 divide-y divide-gray-100 rounded-lg bg-fakeBlr shadow-lg">
          {children}
        </ul>
      ) : (
        <div className="flex flex-col h-full w-full justify-center items-center rounded-lg border border-grn">
          <h1 className="text-grn">No stats</h1>
        </div>
      )}
    </div>
  );
};

const weekHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastWeek.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const monthHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastMonth.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const monthCommentsHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastMonth.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const yearHotTracksParams: HotViews = {
  limit: 20,
  startDate: lastYear.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

const yearHotReleasesParams: HotViews = {
  limit: 20,
  startDate: lastYear.toISOString().split("T")[0],
  endDate: today.toISOString().split("T")[0],
};

export default function Home() {
  const router = useRouter();

  const weekHotTracksQuery = useQuery(
    "week-hot-tracks",
    hotTracks(weekHotTracksParams)
  );

  const monthHotTracksQuery = useQuery(
    "month-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  const yearHotTracksQuery = useQuery(
    "year-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  const monthHotCommentQuery = useQuery(
    "month-hot-comments",
    hotCommentedTracks(monthCommentsHotTracksParams)
  );

  const onClickDisplayTrack = (track: Track) => () => {
    router.push({
      pathname: `/${Pages.Track}`,
      query: { track: JSON.stringify(track) },
    });
  };

  const onClickDisplayRelease = (release: any) => () => {
    router.push({
      pathname: `/${Pages.UserRelease}`,
      query: { track: JSON.stringify(release) },
    });
  };

  return (
    <div className="flex flex-col p-16 bg-drk w-full h-full overflow-y-scroll overflow-x-hidden z-0">
      <div className="flex flex-row grow w-full h-auto">
        <StatsWrapper query={weekHotTracksQuery} title="Week hot tracks">
          {weekHotTracksQuery.data?.map((track, index) => (
            <li key={"track-" + index} value={track}>
              <TrackRow
                track={track}
                onClickDisplayTrack={onClickDisplayTrack(track)}
                disableHover={true}
              />
            </li>
          ))}
        </StatsWrapper>
        <StatsWrapper query={monthHotTracksQuery} title="Month hot tracks">
          {monthHotTracksQuery.data?.map((track, index) => (
            <li key={"track-" + index} value={track}>
              <TrackRow
                track={track}
                onClickDisplayTrack={onClickDisplayTrack(track)}
                disableHover={true}
              />
            </li>
          ))}
        </StatsWrapper>

        <StatsWrapper query={yearHotTracksQuery} title="Year hot tracks">
          {yearHotTracksQuery.data?.map((track, index) => (
            <li key={"track-" + index} value={track}>
              <TrackRow
                track={track}
                onClickDisplayTrack={onClickDisplayTrack(track)}
                disableHover={true}
              />
            </li>
          ))}
        </StatsWrapper>
      </div>
      <div className="flex flex-row grow w-full h-auto">
        <StatsWrapper
          query={monthHotCommentQuery}
          title="Month most commented tracks"
        >
          {monthHotCommentQuery.data?.map((track, index) => (
            <li key={"track-" + index} value={track}>
              <TrackRow
                track={track}
                onClickDisplayTrack={onClickDisplayTrack(track)}
                disableHover={true}
              />
            </li>
          ))}
        </StatsWrapper>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  const payload: ILogin = {
    email: process.env.UNIVERSE_EMAIL,
    password: process.env.UNIVERSE_PASSWORD,
  };
  const adminRefreshToken = await adminLogin(payload).then(
    (response) => response.adminRefreshToken
  );

  await queryClient.prefetchQuery(
    "week-hot-tracks",
    hotTracks(weekHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "month-hot-tracks",
    hotTracks(monthHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "month-hot-comments",
    hotCommentedTracks(monthCommentsHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "year-hot-tracks",
    hotTracks(yearHotTracksParams)
  );

  await queryClient.prefetchQuery(
    "year-hot-releases",
    hotReleases(yearHotReleasesParams)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      adminRefreshToken,
    },
  };
}
