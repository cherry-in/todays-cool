import { Subject, Plan } from '../db/index.js';
import sequelize from 'sequelize';

const { Op } = sequelize

const findAll = async (req, res) => {
  try {
    let findList = null
    const { subjectId } = req.query
    const userId = req.userId
    if (subjectId) findList = await Subject.findAll({ where: { [Op.and]: [{ id: subjectId }, { userId: userId }] }, order: [['updatedAt', 'DESC']] })
    else findList = await Subject.findAll({ where: { userId: userId }, order: [['updatedAt', 'DESC']] })
    const subjectAndPlan = await Promise.all(findList.map(async (subjectInfo) => {
      const resPlan = await Plan.findAll({ where: { subjectId: subjectInfo.id }, order: [[sequelize.literal('checked, deadline'), 'ASC']] })
      subjectInfo.dataValues.planList = resPlan
      return subjectInfo
    }))
    return res.json(subjectAndPlan)
  } catch (error) {
    return res.status(500).send(error.message || "과목 및 해당 과목 관련 학업계획 조회 에러 발생")
  }
}

const findSubject = async (req, res) => {
  try {
    let find = null
    const { subjectId } = req.query
    const userId = req.userId
    if (subjectId) find = await Subject.findOne({ where: { [Op.and]: [{ id: subjectId }, { userId: userId }] }, attributes: ['id', ['name', 'lectureName'], 'prof', ['room', 'classRoom']] })
    else find = await Subject.findAll({ attributes: ['id', 'name'] })
    if (!find) throw new Error("과목 정보를 찾지 못했습니다.")
    return res.json(find)
  } catch (error) {
    return res.status(500).send(error.message || "과목 조회 에러 발생")
  }
}

const create = async (req, res) => {
  try {
    const userId = req.userId
    const { lectureName, prof, classRoom } = req.body
    const newSubject = await Subject.create({ name: lectureName, prof: prof, room: classRoom, userId: userId })
    return res.json(newSubject)
  } catch (error) {
    return res.status(500).send(error.message || "과목 생성 에러 발생")
  }
}

const edit = async (req, res) => {
  try {
    const { subjectId } = req.query
    const userId = req.userId
    const { lectureName, prof, classRoom } = req.body
    const updated = await Subject.update({ name: lectureName, prof: prof, room: classRoom }, { where: { [Op.and]: [{ id: subjectId }, { userId: userId }] } })
    if (!updated) throw new Error("해당 과목의 일부 정보를 수정하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error) {
    return res.status(500).send(error.message || "과목 수정 에러 발생")
  }
}

const remove = async (req, res) => {
  try {
    const { subjectId } = req.query
    const userId = req.userId
    const deleted2 = await Plan.destroy({ where: { subjectId: subjectId } })
    const deleted = await Subject.destroy({ where: { [Op.and]: [{ id: subjectId }, { userId: userId }] } })
    if (!(deleted && deleted2)) throw new Error("해당 과목을 삭제하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error) {
    return res.status(500).send(error.message || "과목 삭제 에러 발생")
  }
}

const getParams = async (req, res, next) => {
  try {
    const { userId } = req.params
    req.userId = userId
    next()
  } catch (error) {
    return res.status(500).send(error.message || "사용자 정보 조회 에러 발생")
  }
}

export default {
  findAll,
  findSubject,
  create,
  edit,
  remove,
  getParams
}