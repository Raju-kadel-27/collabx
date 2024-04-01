import React, { Component } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import enUS from 'date-fns/locale/en-US'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

const locales = {
    'en-US': enUS,
}
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const DnDCalendar = withDragAndDrop(Calendar);

class CollabxCalendar extends Component {
    state = {
        events: [
            {
                title: 'Meetup',
                start: new Date(2023, 7, 23),
                end: new Date(2023, 7, 25),
                color: 'yellow'

            },
        ],
    };

    onEventResize = (data: any) => {
        const { start, end } = data;

        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };

    onEventDrop = (data) => {
        const { start } = data;
        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = new Date(2023, 7, 11);
            return { events: [...state.events] };
        });

    };

    render() {
        return (
            <div className="w-[100vw] h-full py-4 bg-white px-8">
                <p className="bg-blue-500 font-lato text-lg px-8 text-gray-100 w-full py-5">
                    All Collabx Schedule Events
                </p>
                <DnDCalendar
                    className="bg-slate-50 text-blue-600"
                    defaultView="month"
                    events={this.state.events}
                    localizer={localizer}
                    onEventDrop={this.onEventDrop}
                    onEventResize={this.onEventResize}
                    resizable
                    style={{ height: "85vh" }}
                />
            </div>
        );
    }
}

export default CollabxCalendar;
