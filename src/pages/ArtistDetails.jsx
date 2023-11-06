import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  DetailsHeader,
  Error,
  Loader,
  RelatedSongs,
} from "../components";

import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazamCore";


const ArtistDetails = () => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const { id: artistId } = useParams();
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error
  } = useGetArtistDetailsQuery( artistId );

  const {
    data: artistTopSongData,
    isFetching: isFetchingArtistTopSongDetails,
    error: topSongsError
  } = useGetArtistTopSongsQuery( artistId );


  console.log(artistData?.data[0]);
  console.log(artistId);
  console.log(artistTopSongData);
  // console.log(data);

 

  if (isFetchingArtistDetails)
    return <Loader title="loading artist details" />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistData={artistData} artistId={artistId} />

      <RelatedSongs
        data={artistTopSongData?.data.slice(0, 5)}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
