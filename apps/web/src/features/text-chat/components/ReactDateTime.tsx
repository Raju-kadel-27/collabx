import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import './Sample.css';

export const ReactDateTime = () => {
    const [value, onChange] = useState(new Date());
    console.log({value})

    return (
        <div className="Sample">
            <header>
                <h1>Set Trigger Time</h1>
                <p className='text-sm text-slate-200'>You'll be notified once message is sent.</p>
            </header>
            <div className="Sample__container">
                <main className="Sample__container__content">
                    <DateTimePicker
                        amPmAriaLabel="Select AM/PM"
                        calendarAriaLabel="Toggle calendar"
                        clearAriaLabel="Clear value"
                        dayAriaLabel="Day"
                        hourAriaLabel="Hour"
                        maxDetail="second"
                        minuteAriaLabel="Minute"
                        monthAriaLabel="Month"
                        nativeInputAriaLabel="Date and time"
                        onChange={onChange}
                        secondAriaLabel="Second"
                        value={value}
                        yearAriaLabel="Year"
                    />
                </main>
            </div>
        </div>
    );
}