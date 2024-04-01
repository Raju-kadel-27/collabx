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

export class ClassCalendar extends Component {
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

    onEventResize = (data) => {
        // console.log({ data }, 'onresize')
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
            <div className="App py-8 bg-white px-8">
                <p className="bg-red-500 w-full py-3"></p>
                <DnDCalendar
                    className="bg-slate-50 text-red-600"
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
