import http from './http'

export default {
    callMethod(type, method, params = {}, headers = {Authorization: 'Bearer null'}, is_prefix = true) {
        return new Promise(async (resolve, reject) => {
            const url = (process.env.NODE_ENV == 'development' ? 'https://opt6.compas.pro' : 'https://opt6.compas.pro') + (is_prefix ? '/api/' : '/') + method
            try {
                headers.Authorization = `Bearer 7nBfp7NLHdDnC4MAeIg6CG1DS5nyPkKOni2VWpz1Tp1WBR6BsZuE8hL5grMr`
                let result = await http.call(type, url, params, headers)
                resolve(result)
            } catch(e) {
                reject(e)
            }
        })
    }
}
