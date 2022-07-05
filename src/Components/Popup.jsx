import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addEvent, setOpenModal } from '../Store/app-slice';
import { variables } from "../utils/variables";

const Popup = () => {
    const dispatch = useDispatch();
    const { ceils } = useSelector(s => s.app);

    const addNewEventHandler = () => {
        const formatDate = new Date(date.replace(' ', 'T')) // 2022-07-05 12:30:00 => 2022-07-05T12:30:00
        const dateInMs = formatDate.getTime();
        const el = ceils.slice().sort().find(el => el >= dateInMs) // нахожу следующую ближайшую по дате ячейку
        dispatch(addEvent(el))
    }

    const [date, setDate] = useState('');
    const [error, setError] = useState(false);

    const onChangeInputHandler = (e) => {
    const value = e.currentTarget.value;
        setDate(value)

        if (value.match( /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/ )) {
            setError(false)
        } else {
            setError(true)
        }
    }

    return (
        <StyledPopup className='popup-wrapper'>
            <div onClick={() => dispatch(setOpenModal(false))} className='popup-background'/>
            <div className='popup'>
                <div className="popup-content-block">
                    <span className='popup-title'>https://calendar.com</span>
                    <span className='popup-deskr'>Enter event time:</span>
                    <span className='popup-date'>YYYY-MM-DD HH:mm:ss</span>
                    { error && <span className='error'>Please use YYYY-MM-DD HH:mm:ss format of date</span> }
                    <input onChange={onChangeInputHandler} value={date} type="text" />
                </div>
                <div className="popup-btn-block">
                    <button onClick={() => dispatch(setOpenModal(false))} className='popup-btn popup-btn_cancel'>Cancel</button>
                    <button onClick={addNewEventHandler} className='popup-btn popup-btn_ok'>OK</button>
                </div>
            </div>
        </StyledPopup>
    )
};

export default Popup;

const StyledPopup = styled.div`
&.popup-wrapper {
    position: fixed;
    z-index: 20;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}

& .popup-background {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
}

& .popup {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50% , -50%);
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 99;
    max-width: 330px;
    width: 100%;
    background-color: ${variables.backgroundLightColor};
    border-radius: 20px;
}

& .popup-content-block {
    position: relative;
    padding: 20px 15px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & input {
        padding: 5px;
        margin: 0;
        border: 1px solid ${variables.borderColor};
        width: 100%;
        color: ${variables.blueColor};
        font-size: 18px;

        &:focus-visible {
            outline: none;
        }
    }

    & .error {
        position: absolute;
        left: 15px;
        bottom: 38px;
        width: 100%;
        height: 20px;
        color: ${variables.accentColor};
        font-size: 12px;
    }

    & .popup-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    & .popup-deskr {
        font-size: 18px;
        margin-bottom: 5px;
    }

    & .popup-date {
        font-size: 18px;
        margin-bottom: 26px;
    }
}

& .popup-btn {
    width: calc(50% - 0.5px);
    color: ${variables.blueColor};
    border-top: 1px solid ${variables.borderColor};
    padding: 20px 0;
    box-sizing: content-box;
    font-size: 20px;
}

& .popup-btn_cancel {
    border-right: 1px solid ${variables.borderColor};
}
`