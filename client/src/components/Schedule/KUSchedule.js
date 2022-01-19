import styles from "./schedule.module.scss";

const KUSchedule = ({ schedule }) => {
    return (
        <div className="card w-75 rounded-0 border-dark mx-auto">
            <div className={`card-header rounded-0 p-1 ${styles.header}`}>
                <img className={styles.ku_tiger} src={process.env.PUBLIC_URL + '/ku-tiger(bgX).png'} alt="어흥이" />
            </div>
            <div className="card-body text-center pb-2">
                {schedule.title.length > 12 ? <marquee className={`card-title fs-5 ${styles.flowText}`} loop="infinite">{schedule.title}</marquee> : <h5 className="card-title">{schedule.title}</h5>}
                <p className="card-text text-secondary mb-1">{(schedule.start === schedule.end) ? schedule.start : schedule.start + " ~ " + schedule.end}</p>
                <p className="text-start mb-0">{schedule.memo}</p>
            </div>
        </div>
    )
}

export default KUSchedule