import clientConfig from './clientConfig'

const baseUrl = process.env.NODE_ENV === 'production'
    ? `/app/todayku`
    : "/app/todayku"

export default baseUrl
