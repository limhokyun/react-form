// Need to use the React-specific entry point to import `createApi`
import { getCookiToken } from "@/storage/Cookie"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ModelApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    reducerPath: "modelApi",
    tagTypes: ["Model"],
    endpoints: (build) => (
        {
            // POST 요청을 위한 엔드포인트 정의
            createModel: build.mutation({
                query: (modelData) => ({
                    url: "/model/create", // POST 요청을 보낼 경로
                    method: "POST", // HTTP 메서드 지정
                    body: modelData, // 전달할 데이터
                    headers: {
                        "Authorization": getCookiToken(),
                        "Content-Type": "application/json",
                    },
                }),
                invalidatesTags: [{ type: "Model", id: "LIST" }],
            }),
            //  
            getModels: build.query<any, void>({
                query: () => ({
                    url: "/model/list", // POST 요청을 보낼 경로
                    method: "GET", // HTTP 메서드 지정

                    headers: {
                        "Authorization": getCookiToken(),
                        "Content-Type": "application/json",
                    },
                }),
                providesTags: [{ type: "Model", id: "LIST" }],
            }),

        }),
})


// Hooks are auto-generated by RTK Query
// `useCreateUserMutation` Hook을 사용하여 POST 요청 수행
export const { useCreateModelMutation, useGetModelsQuery } = ModelApiSlice