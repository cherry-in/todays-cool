import ScheduleCarousel from "../Schedule/ScheduleCarousel";
import ScheduleList from "../Schedule/ScheduleList";
import { createPlugin } from '@fullcalendar/react';

const CustomDateView = () => {
    return (
        <div className='fc-custom-view border-top border-dark pt-2'>
            <ScheduleCarousel />
            <ScheduleList />
        </div>
    )
}

export default createPlugin({
    views: {
        date: CustomDateView
    }
})