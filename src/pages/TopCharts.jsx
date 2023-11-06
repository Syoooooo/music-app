import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongByCountryQuery } from "../redux/services/shazamCore";
import { useState } from "react";
import { useEffect } from "react";

const TopCharts = () => {
  const [country, setCountry] = useState("");

  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );
  const { data, isFetching, error } =
    useGetSongByCountryQuery(country);

  // console.log(country);
  // console.log(data);

  
  useEffect(() => {
    axios
      .get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_R5weaWbhAruV0JkSBB0XSMEGImG0o`
      )
      .then((res) =>
        setCountry(res?.data?.location?.country)
      )
      .catch((err) => console.log(err))
      .finally();
  }, [country]);


  if (isFetching)
    return <Loader title="Loading songs around you" />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Discover Top Charts
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
