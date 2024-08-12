import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const wordsApi = createApi({
    reducerPath: 'wordsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://random-word-api.vercel.app/api"}),
    endpoints: (builder) => ({
        getRandomWords: builder.mutation<string[], null>({
            query: () => ({
                url: `?words=300`,
                method: "GET"
            })
        })
    })
})

export const { useGetRandomWordsMutation } = wordsApi