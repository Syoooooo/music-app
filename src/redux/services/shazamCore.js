import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "5f6da336f8mshc624e307c654224p17f162jsnb9ff6cf75ece"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => "/charts/track",
    }),
    getSongDetails: builder.query({
      query: ({ songid }) =>
        `/songs/get-details?key=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ( songid ) =>
        `/songs/get-related-artist?id=${songid}`,
    }),
    getArtistDetails: builder.query({
      query: ( artistId ) =>
        `/artists/get-details?id=${artistId}`,
    }),
    getArtistTopSongs: builder.query({
      query: ( artistId ) =>
        `/artists/get-top-songs?id=${artistId}`,
    }),
    getSongByCountry: builder.query({
      query: ( countryCode ) =>
        `charts/track?locale=${countryCode}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  // useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetSongByCountryQuery,
} = shazamCoreApi;
