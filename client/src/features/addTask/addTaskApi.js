import apiSlice from '../api/apiSlice';

export const addTaskApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTask: builder.mutation({
            query: (data) => ({
                url: '/api/user/add-task-787',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['getRoomInfo'],
        }),
        addTaskStudent: builder.mutation({
            query: (data) => ({
                url: '/api/user/add-task-student',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['getRoomInfo'],
        }),
        completeTask: builder.mutation({
            query: (id) => ({
                url: '/api/user/task-completed88',
                method: 'PATCH',
                body: id,
            }),
            invalidatesTags: ['getRoomInfo'],
        }),
        completeTaskStudent: builder.mutation({
            query: (id) => ({
                url: '/api/user/task-complete-student',
                method: 'PATCH',
                body: id,
            }),
            invalidatesTags: ['getRoomInfo', 'getUserInfo'],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: '/api/user/delete-task45',
                method: 'PATCH',
                body: id,
            }),
            invalidatesTags: ['getRoomInfo'],
        }),
        studentTaskDelete: builder.mutation({
            query: (data) => ({
                url: '/api/user/delete-student-task',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['getUserInfo'],
        }),
    }),
});

export const {
    useAddTaskMutation,
    useCompleteTaskMutation,
    useDeleteTaskMutation,
    useAddTaskStudentMutation,
    useCompleteTaskStudentMutation,
    useStudentTaskDeleteMutation,
} = addTaskApi;
