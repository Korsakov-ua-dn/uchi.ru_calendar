// import { useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { variables } from "../utils/variables";
import { ReactComponent as Plus } from '../Assets/plus.svg';
import {ReactComponent as Arrow } from '../Assets/arrow.svg';
import { removeEvent, setActiveCeil, setOpenModal } from '../Store/app-slice';

const Main = () => {
   const dispatch = useDispatch();
   const { ceils, dates, activeCeil, ceilsWithEvent } = useSelector(s => s.app);

   const ceilClickHandler = (e) => {
    if ( e.target.tagName === 'LI') {
        dispatch(setActiveCeil(e.target.id))
    }
   }

   const addEventHandler = () => {
    dispatch(setOpenModal(true))
   }

   const deleteCeilHandler = () => {
    dispatch(removeEvent(activeCeil))
   }
   

// console.log(activeCeil);
// console.log(ceilsWithEvent);

    return (
        <StyledCalendar>
            <div className='container'>
                <div className='title'>
                    <span>Interview Calendar</span>
                    <button onClick={addEventHandler} className='add-btn'><Plus /></button>
                </div>
                <div className='header'>
                    <div className='header_left'></div>
                    <div className='header_right-wrapper'>
                        <div className='header_right'>
                            {dates.map(i => <HeaderItem key={i.getTime()} i={i}/>)}
                        </div>
                        <div className='header_year'>
                            <div className='flex-center'><Arrow className='arrow_left'/></div>
                            <span className='flex-center'>July 2022</span>
                            <div className='flex-center'><Arrow className='arrow_right'/></div>
                        </div>
                    </div>
                    
                </div>
                <div className='table-wrapper'>
                    <div className='timeline'>
                        <span>09:00</span>
                        <span>10:00</span>
                        <span>11:00</span>
                        <span>12:00</span>
                        <span>13:00</span>
                        <span>14:00</span>
                        <span>15:00</span>
                        <span>16:00</span>
                        <span>17:00</span>
                        <span>18:00</span>
                        <span>19:00</span>
                        <span>20:00</span>
                    </div>
                    <ul className='table' onClick={ceilClickHandler}>
                        {
                            ceils.map(el => <Ceil key={el} el={el}/>)
                        }
                    </ul>
                </div>  
                <div className='footer'>
                    <button className='add-btn'>Tooday</button>
                    { ceilsWithEvent?.find(el => el == activeCeil) && <button onClick={deleteCeilHandler} className='add-btn'>Delete</button> }
                </div>
            </div>
        </StyledCalendar>
    )
};

export default Main;

const Ceil = ({ el }) => {
    const { activeCeil, ceilsWithEvent } = useSelector(s => s.app);

    const ceilClassName = `${activeCeil == el ? 'active' : ''} ${ceilsWithEvent.find(e => e == el) ? 'event' : ''} ceil`
    return <li key={el} id={el} className={ceilClassName}></li>
}

const HeaderItem = ({ i }) => {
    const now = new Date()

    const dateClassName = now.getDate() === i.getDate()? 'date flex-center active' : 'date flex-center'

    return (
        <div className='header_item'>
            <span className='day'>{["S", "M", "T", "W", "T", "F", "S"][i.getDay()]}</span>
            <span className={dateClassName}>{i.getDate() > 9 ? i.getDate() : `0` + i.getDate()}</span>
        </div>
    )
}

const StyledCalendar = styled.main` 
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    & .container {
        max-width: 740px;
        width: 100%;
    }

    & .title {
        padding: 20px 35px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${variables.backgroundLightColor};

        & span {
            font-size: 24px;
        }
    }

    & .header, .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: ${variables.backgroundColor};
        border-top: 1px solid ${variables.borderColor};
        border-bottom: 1px solid ${variables.borderColor};
    }

    & .add-btn {
        padding: 0;
        border: none;
        font: inherit;
        background-color: transparent;
        cursor: pointer;
        &:focus-visible {
            outline: none;
        }

        & svg {
            width: 20px;
            height: 20px;
            fill: ${variables.accentColor};
            display: flex;
            justify-content: center;
        }
    }

    & .header {
        padding: 10px 0;

        & .header_left {
            width: 65px;
        }

        & .header_right-wrapper {
            width: 100%;
        }

        & .header_right {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }

        & .header_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & .day {
                margin-bottom: 10px;
                font-size: 12px;
                font-weight: 700;
            }

            & .date {
                width: 30px;
                height: 30px;
                margin-bottom: 5px;
                font-size: 18px;
                border-radius: 100%;

                &.active {
                    background-color: ${variables.accentColor};
                    color: #ffffff;
                }
            }
        }

        & .header_year {
            display: grid;
            grid-template-columns: 1fr 5fr 1fr;

            & span {
                font-size: 20px;
            }

            & svg {
                fill: ${variables.accentColor};
                height: 18px;
            }

            & .arrow_left {
                transform: rotate(-90deg);
            }

            & .arrow_right {
                transform: rotate(90deg);
            }
        }
    }

    & .table-wrapper {
        width: 100%;
        height: 600px;
        overflow: hidden;
        display: flex;
        background-color: ${variables.backgroundLightColor};
    }

    & .timeline {
        width: 65px;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 15px;

        & span {
            margin: 15.5px 0;
            color: ${variables.borderColor};
        }
    }

    & .table {
        width: 100%;
        // transform: scale(1.003);
        transform: translate(1px, -25px);
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        & .ceil {
            border-bottom: 1px solid ${variables.borderColor};
            border-right: 1px solid ${variables.borderColor};
            height: 50px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 2px;
                top: 2px;
                width: calc(100% - 4px);
                height: calc(100% - 4px);
            }
        }

        & .ceil.event::after {
            background-color: #d5e0ff;
        }

        & .ceil.active::after {
            background-color: #a4bcff;
        }
    }

    & .footer {
        padding: 20px 35px;

        & button {
            color: ${variables.accentColor};
            font-size: 24px;
        }
    }
`