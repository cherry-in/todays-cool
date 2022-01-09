import { KU, Schedule } from "../db/index.js";
import sequelize from 'sequelize';

const { Op } = sequelize

const findbyId = async (req, res, next) => {
    try {
        const id = req.scheduleId
        const userId = req.userId
        let findSchedule = null
        let startDate = null
        let endDate = null
        if (id && userId) {
            if (userId === "ku") {
                findSchedule = await KU.findOne({ where: { id: id } })
                if (!findSchedule) throw new Error("해당 일정을 찾지 못했습니다.")
                else {
                    const { id, title, start, end, memo } = findSchedule
                    startDate = dateToString(start, "full")
                    endDate = dateToString(end, "full")
                    req.schedule = { id, title, startDate: startDate, endDate: endDate, memo }
                }
            } else {
                findSchedule = await Schedule.findOne({ where: { [Op.and]: [{ id: id }, { userId: userId }] } })
                if (!findSchedule) throw new Error("해당 일정을 찾지 못했습니다.")
                else {
                    const { id, title, start, end, allDay, location, memo } = findSchedule
                    startDate = dateToString(start, "full")
                    endDate = dateToString(end, "full")
                    const startTime = dateToString(start, "time")
                    const endTime = dateToString(end, "time")
                    req.schedule = { id, title, startDate, endDate, startTime, endTime, allDay: allDay ? "on" : "off", location, memo }
                }
            }
            next()
        } else next()
    } catch (error) {
        return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
    }
}

const findbyDate = async (req, res, next) => {
    try {
        if (req.date || req.month) {
            let date = ""
            let startDate = null
            let endDate = null
            let findList = null
            let findKUList = null
            let findIndividualList = null
            if (req.date) {
                // 날짜 기준
                date = new Date(req.date)
                startDate = new Date(req.date)
                startDate.setHours(24, 0, 0, 0)
                endDate = new Date(req.date)
                endDate.setHours(0, 0, 0, 0)
                if (req.userId === "ku") {
                    findKUList = await KU.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    start: {
                                        [Op.lte]: date
                                    }
                                }, {
                                    end: {
                                        [Op.gte]: date
                                    }
                                }
                            ]
                        }, order: [['updatedAt', 'DESC']]
                    })
                    findKUList.forEach(schedule => {
                        schedule.dataValues.start = dateToString(schedule.dataValues.start, "twoYear")
                        schedule.dataValues.end = dateToString(schedule.dataValues.end, "twoYear")
                    })
                    findList = findKUList
                } else {
                    findIndividualList = await Schedule.findAll({
                        where: {
                            [Op.and]: [
                                {
                                    start: {
                                        [Op.lte]: startDate
                                    }
                                }, {
                                    end: {
                                        [Op.gte]: endDate
                                    }
                                }
                            ]
                        }, order: [['updatedAt', 'DESC']]
                    })
                    findIndividualList.forEach(schedule => {
                        schedule.dataValues.startDate = dateToString(schedule.dataValues.start, "twoYear")
                        schedule.dataValues.endDate = dateToString(schedule.dataValues.end, "twoYear")
                        if (!schedule.dataValues.allDay) {
                            schedule.dataValues.startTime = dateToString(schedule.dataValues.start, "time")
                            schedule.dataValues.endTime = dateToString(schedule.dataValues.end, "time")
                        }
                    })
                    findList = findIndividualList
                }
            } else {
                // 달 기준
                date = new Date(req.month)
                const year = dateToString(date, "year")
                const month = dateToString(date, "month")
                findKUList = await KU.findAll({
                    where: {
                        [Op.or]: [
                            {
                                [Op.and]: [
                                    sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('start')), year),
                                    sequelize.where(sequelize.fn('date_part', 'month', sequelize.col('start')), month)
                                ]
                            }, {
                                [Op.and]: [
                                    sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('end')), year),
                                    sequelize.where(sequelize.fn('date_part', 'month', sequelize.col('end')), month)
                                ]
                            }
                        ]
                    }, attributes: ['id', 'title', 'start', 'end']
                    , order: [['start']]
                })
                findKUList.forEach(schedule => {
                    schedule.dataValues.end.setDate(schedule.dataValues.end.getDate() + 1)
                    schedule.dataValues.end = dateToString(schedule.dataValues.end, "full")
                    schedule.dataValues.start = dateToString(schedule.dataValues.start, "full")
                    schedule.dataValues.allDay = true
                    schedule.dataValues.className = ['text', 'first']
                })
                if (req.userId === "ku") {
                    findList = findKUList
                } else {
                    findIndividualList = await Schedule.findAll({
                        where: {
                            [Op.or]: [
                                {
                                    [Op.and]: [
                                        sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('start')), year),
                                        sequelize.where(sequelize.fn('date_part', 'month', sequelize.col('start')), month)
                                    ]
                                }, {
                                    [Op.and]: [
                                        sequelize.where(sequelize.fn('date_part', 'year', sequelize.col('end')), year),
                                        sequelize.where(sequelize.fn('date_part', 'month', sequelize.col('end')), month)
                                    ]
                                }
                            ]
                        }, attributes: ['id', 'title', 'start', 'end']
                        , order: [['start']]
                    })
                    findIndividualList.forEach(schedule => {
                        schedule.dataValues.end.setDate(schedule.dataValues.end.getDate() + 1)
                        schedule.dataValues.end = dateToString(schedule.dataValues.end, "full")
                        schedule.dataValues.start = dateToString(schedule.dataValues.start, "full")
                        schedule.dataValues.allDay = true
                        schedule.dataValues.className = ['text', 'indi']
                    })
                    findList = { KU: findKUList, individual: findIndividualList }
                }
            }
            req.scheduleList = findList
            next()
        } else next()
    } catch (error) {
        return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
    }
}

const create = async (req, res) => {
    try {
        let newSchedule = null
        let start = null
        let end = null
        let allDay_v = false
        const userId = req.userId
        if (userId === "ku") {
            const { title, startDate, endDate, memo } = req.body
            start = new Date(startDate)
            end = new Date(endDate)
            newSchedule = await KU.create({ title: title, start: start, end: end, memo: memo })
        } else {
            const { title, startDate, endDate, startTime, endTime, allDay, location, memo } = req.body
            if (allDay === "on") {
                start = new Date(startDate)
                end = new Date(endDate)
                allDay_v = true
            } else {
                start = new Date(startDate + " " + startTime)
                end = new Date(endDate + " " + endTime)
            }
            newSchedule = await Schedule.create({ title: title, start: start, end: end, allDay: allDay_v, location: location, memo: memo, userId: userId })
        }
        return res.json(newSchedule)
    } catch (error) {
        return res.status(500).send(error.message || "일정 등록 중 에러 발생")
    }
}

const edit = async (req, res) => {
    try {
        let updated = null
        let start = null
        let end = null
        let allDay_v = false
        const userId = req.userId
        const { scheduleId } = req.query
        if (userId === "ku") {
            const { title, startDate, endDate, memo } = req.body
            start = new Date(startDate)
            end = new Date(endDate)
            updated = await KU.update({ title: title, start: start, end: end, memo: memo }, { where: { id: scheduleId } })
        } else {
            const { title, startDate, endDate, startTime, endTime, allDay, location, memo } = req.body
            if (allDay === "on") {
                start = new Date(startDate)
                end = new Date(endDate)
                allDay_v = true
            } else {
                start = new Date(startDate + " " + startTime)
                end = new Date(endDate + " " + endTime)
            }
            updated = await Schedule.update({ title: title, start: start, end: end, allDay: allDay_v, location: location, memo: memo },
                { where: { [Op.and]: [{ id: scheduleId }, { userId: userId }] } })
        }
        if (!updated) throw new Error("해당 일정의 일부 정보를 수정하는데 실패하였습니다.")
        else return res.send(200)
    } catch (error) {
        return res.status(500).send(error.message || "일정 수정 중 에러 발생")
    }
}

const remove = async (req, res) => {
    try {
        let deleted = null
        const userId = req.userId
        const { scheduleId } = req.query
        if (userId === "ku") deleted = await KU.destroy({ where: { id: scheduleId } })
        else deleted = await Schedule.destroy({ where: { [Op.and]: [{ id: scheduleId }, { userId: userId }] } })
        if (!deleted) throw new Error("해당 일정을 삭제하는데 실패하였습니다.")
        else return res.send(200)
    } catch (error) {
        return res.status(500).send(error.message || "일정 삭제 중 에러 발생")
    }
}

const getParams = async (req, res, next) => {
    try {
        const { userId } = req.params
        req.userId = userId
        next()
    } catch (error) {
        return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
    }
}

const querySeparation = async (req, res, next) => {
    try {
        const { scheduleId, date, dateMonth } = req.query
        req.scheduleId = scheduleId
        req.date = date
        req.month = dateMonth
        next()
    } catch (error) {
        return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
    }
}

const send = async (req, res) => {
    try {
        const result = req.schedule || req.scheduleList
        return res.json(result)
    } catch (error) {
        return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
    }
}

export function dateToString(dateObj, method) {
    const year = dateObj.getFullYear()
    const year_disit = String(year).substring(2, 4)
    const month = dateObj.getMonth() + 1
    const date = dateObj.getDate()
    const hour = dateObj.getHours()
    const minute = dateObj.getMinutes()

    switch (method) {
        case "full":
            return [year, (month > 9 ? "" : "0") + month, (date > 9 ? "" : "0") + date].join("-")
        case "twoYear":
            return [year_disit, (month > 9 ? "" : "0") + month, (date > 9 ? "" : "0") + date].join(".")
        case "time":
            return [(hour > 9 ? "" : "0") + hour, (minute > 9 ? "" : "0") + minute].join(":")
        case "year":
            return year
        case "month":
            return month
    }
}

export default {
    findbyId,
    findbyDate,
    create,
    edit,
    remove,
    getParams,
    querySeparation,
    send
}