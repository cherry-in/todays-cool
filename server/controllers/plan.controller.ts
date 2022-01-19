import { NextFunction, Request, RequestHandler, Response } from "express";
import { Plan } from "../db";
import { dateToString } from "./schedule.controller";

const getOne:RequestHandler = async (req, res) => {
  try {
    let sendPlan = null
    const planId = req.body.planId
    const findPlan = await Plan.findOne({ where: { id: planId } })
    if (!findPlan) throw new Error("학업 계획 정보를 찾지 못했습니다.")
    else {
      const { id, title, deadline, memo, timeChecked, checked, subjectId } = findPlan
      const endDate = dateToString(deadline, "full")
      if (timeChecked) {
        const endTime = dateToString(deadline, "time")
        sendPlan = { id: id, studyplanTitle: title, endDate: endDate, endTime: endTime, deadline: timeChecked ? "on" : "off", memo: memo, selected: subjectId }
      } else sendPlan = { id: id, studyplanTitle: title, endDate: endDate, deadline: timeChecked ? "on" : "off", memo: memo, selected: subjectId }
    }
    return res.json(sendPlan)
  } catch (error:any) {
    return res.status(500).send(error.message || "학업계획 조회 중 에러 발생")
  }
}

const create:RequestHandler = async (req, res) => {
  try {
    let date = null
    let check_v = false
    const { studyplanTitle, endDate, endTime, memo, deadline, selected } = req.body
    if (deadline === "on") {
      date = new Date(endDate + " " + endTime)
      check_v = true
    } else date = new Date(endDate)
    const newPlan = await Plan.create({ title: studyplanTitle, deadline: date, memo: memo, timeChecked: check_v, subjectId: selected })
    return res.json(newPlan)
  } catch (error:any) {
    return res.status(500).send(error.message || "학업계획 생성 중 에러 발생")
  }
}

const edit:RequestHandler = async (req, res) => {
  try {
    const planId = req.body.planId
    let date = null
    let check_v = false
    const { studyplanTitle, endDate, endTime, memo, deadline, selected } = req.body
    if (deadline === "on") {
      date = new Date(endDate + " " + endTime)
      check_v = true
    } else date = new Date(endDate)
    const updated = await Plan.update({ title: studyplanTitle, deadline: date, memo: memo, timeChecked: check_v, subjectId: selected }, { where: { id: planId } })
    if (!updated) throw new Error("해당 학업계획의 일부 정보를 수정하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error: any) {
    return res.status(500).send(error.message || "학업계획 수정 중 에러 발생")
  }
}

const putCk:RequestHandler = async (req, res) => {
  try {
    console.log('server/planCtrl/putCk req.body', req.body)
    const planId = req.body.planId
    const result = await Plan.update({ checked: !req.body.planCk }, { where: { id: planId } })
    if (!result) throw new Error("체크 상태 수정에 실패하였습니다.")
    else return res.send("success")
  } catch (error:any) {
    return res.status(500).send(error.message || "체크 상태 저장 중 에러 발생")
  }
}

const remove:RequestHandler = async (req, res) => {
  try {
    const planId = req.body.planId
    const deleted = await Plan.destroy({ where: { id: planId } })
    if (!deleted) throw new Error("해당 과목을 삭제하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error: any) {
    return res.status(500).send(error.message || "학업계획 삭제 중 에러 발생")
  }
}

const getParams:RequestHandler = async (req, res, next) => {
  try {
    const { planId } = req.params
    req.body.planId = planId
    next()
  } catch (error: any) {
    return res.status(500).send(error.message || "일정 가져오는 중 에러 발생")
  }
}

export default {
  getOne,
  create,
  edit,
  putCk,
  remove,
  getParams
}