import { Todo } from '../db/index.js';
import sequelize from 'sequelize';

const { Op } = sequelize

const findbyDate = async (req, res) => {
  try {
    // Todo 페이지
    const userId = req.userId
    const { date } = req.query
    const nonCheck = await Todo.findAll({ where: { [Op.and]: [{ done: false }, { date: { [Op.eq]: date } }, { userId: userId }] }, attributes: ['id', ['title', 'todoTitle'], ['date', 'todoDate'], 'done'], order: [['updatedAt', "DESC"]] })
    const check = await Todo.findAll({ where: { [Op.and]: [{ done: true }, { date: { [Op.eq]: date } }, { userId: userId }] }, attributes: ['id', ['title', 'todoTitle'], ['date', 'todoDate'], 'done'], order: [['updatedAt', "DESC"]] })
    check.forEach(el => nonCheck.push(el.dataValues))
    return res.json(nonCheck)
  } catch (error) {
    return res.status(500).send(error.message || "todo 가져오는 중 에러 발생")
  }
}

const findforPercent = async (req, res) => {
  try {
    let nonCheck = null
    let check = null
    const userId = req.userId
    const { start, end } = req.query
    if (end) {
      // weekly percent
      nonCheck = await Todo.findAll({
        where: { [Op.and]: [{ userId: userId }, { done: false }, { date: { [Op.between]: [start, end] } }] },
        order: [['date']]
      })
      check = await Todo.findAll({
        where: { [Op.and]: [{ userId: userId }, { done: true }, { date: { [Op.between]: [start, end] } }] },
        order: [['date']]
      })
      const nonCheckCountList = countInList(nonCheck)
      let checkCountList = countInList(check)
      let percentList = nonCheckCountList.map(nonCheckEl => {
        const findIdx = checkCountList.findIndex(el => el.date === nonCheckEl.date)
        if (findIdx === -1) nonCheckEl['rate'] = 0
        else {
          nonCheckEl['rate'] = Math.round((checkCountList[findIdx].count / (nonCheckEl.count + checkCountList[findIdx].count)) * 100)
          checkCountList.splice(findIdx, 1)
        }

        return nonCheckEl
      })
      if (checkCountList.length !== 0) {
        checkCountList.forEach(el => el['rate'] = 100)
        const sendList = percentList.concat(checkCountList).sort((pre, next) => {
          if (pre.date < next.date) return -1
          else if (pre.date > next.date) return 1
          else return 0
        })
        return res.json(sendList)
      } else return res.json(percentList)
    } else {
      // Menu
      let percent = 0
      nonCheck = await Todo.findAndCountAll({ where: { [Op.and]: [{ date: { [Op.eq]: start } }, { userId: userId }, { done: false }] }, order: [['updatedAt', "DESC"]] })
      check = await Todo.findAndCountAll({ where: { [Op.and]: [{ date: { [Op.eq]: start } }, { userId: userId }, { done: true }] }, order: [['updatedAt', "DESC"]] })
      let total = nonCheck.count + check.count
      if (total !== 0) percent = Math.round((check.count / total) * 100)

      if (nonCheck.count < 3) check.rows.forEach(el => nonCheck.rows.push(el.dataValues))
      return res.json({ percent: percent, list: nonCheck.rows.slice(0, 3) })
    }
  } catch (error) {
    return res.status(500).send(error.message || "todo 가져오는 중 에러 발생")
  }
}

const create = async (req, res) => {
  try {
    const userId = req.userId
    const { todoTitle, todoDate } = req.body
    const newTodo = await Todo.create({ title: todoTitle, date: todoDate, userId: userId })
    return res.json(newTodo)
  } catch (error) {
    return res.status(500).send(error.message || "todo 등록 중 에러 발생")
  }
}

const edit = async (req, res) => {
  try {
    let updated = null
    const userId = req.userId
    const { todoId } = req.query
    const { todoTitle, todoDate, done } = req.body
    if (todoTitle) updated = await Todo.update({ title: todoTitle, date: todoDate }, { where: { [Op.and]: [{ id: todoId }, { userId: userId }] } })
    else if (todoDate) updated = await Todo.update({ date: todoDate }, { where: { [Op.and]: [{ id: todoId }, { userId: userId }] } })
    else updated = await Todo.update({ done: !done }, { where: { [Op.and]: [{ id: todoId }, { userId: userId }] } })
    if (!updated) throw new Error("해당 todo의 일부 정보를 수정하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error) {
    return res.status(500).send(error.message || "todo 수정 중 에러 발생")
  }
}

const remove = async (req, res) => {
  try {
    const userId = req.userId
    const { todoId } = req.query
    const deleted = await Todo.destroy({ where: { [Op.and]: [{ id: todoId }, { userId: userId }] } })
    if (!deleted) throw new Error("해당 todo를 삭제하는데 실패하였습니다.")
    else return res.send(200)
  } catch (error) {
    return res.status(500).send(error.message || "todo 삭제 중 에러 발생")
  }
}

const getParams = async (req, res, next) => {
  try {
    const { userId } = req.params
    req.userId = userId
    next()
  } catch (error) {
    return res.status(500).send(error.message || "todo 가져오는 중 에러 발생")
  }
}

function countInList(list) {
  const countList = list.reduce((acc, cur) => {
    const findIdx = acc.findIndex(el => el.date === cur.dataValues.date)
    if (findIdx === -1) acc.push({ date: cur.dataValues.date, count: 1 })
    else acc[findIdx].count += 1

    return acc
  }, [])
  return countList
}

export default {
  findbyDate,
  findforPercent,
  create,
  edit,
  remove,
  getParams
}