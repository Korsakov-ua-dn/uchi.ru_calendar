import { createSlice } from '@reduxjs/toolkit';

const ceils = [];
const dates = [];

// генерирую массив ячеек на 1 неделю начиная с указанной даты
for (let i=9; i<=24; i++) {
    let time = i + ":00"
    if (i < 10) {
        time = "0" + time
    }
    if (i > 20 && i < 24) {
        continue;
    }
    if (i === 24) {
        time = "23:59"
    }

    for (let n=0; n<7; n++) {
        let day = 4 + n;
        if (day < 10) {
            day = "0" + day
        }
        if (i === 9) {
          dates.push(new Date(`2022-07-${day}T${time}`));
        }

        const date = new Date(`2022-07-${day}T${time}`);
        ceils.push(date.getTime())
    }
}


const appSlice = createSlice({
  name: 'app',
  initialState: {
    ceils,
    dates,
    activeCeil: null,
    ceilsWithEvent: [],
    openModal: false,
  },
  reducers: {
    setActiveCeil(state, action) {
      state.activeCeil = action.payload
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    addEvent(state, action) {
      state.ceilsWithEvent.push(action.payload)
      state.openModal = false
    },
    removeEvent(state, action) {
      state.ceilsWithEvent = state.ceilsWithEvent.filter(el => el !== Number(action.payload))
    }
  }
})

export const { setActiveCeil, setOpenModal, addEvent, removeEvent } = appSlice.actions
export default appSlice.reducer