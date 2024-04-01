import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialStateProps {
    modalType: string | "Create Channel" | "Manage Team" | ''
    isModalOpen: boolean
}

interface PayloadActionDetail {
    modalType: InitialStateProps['modalType']
    isModalOpen: boolean
}

const initialState: InitialStateProps = {
    modalType: '',
    isModalOpen: false
}

export const teamSlice = createSlice({
    name: 'teamSlice',
    initialState,
    reducers: {
        openModal: (
            state,
            action: PayloadAction<PayloadActionDetail>
        ) => {
            const { modalType, isModalOpen } = action.payload
            state.modalType = modalType
            state.isModalOpen = isModalOpen
        },
        closeModal: (state) => {
            state.modalType = ''
            state.isModalOpen = false
        },
    },
})

export const {
    openModal,
    closeModal
} = teamSlice.actions

export default teamSlice.reducer
