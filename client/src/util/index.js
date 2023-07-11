
import moment from 'moment'
export const FormData=(date, format="DD-MM-YYYY")=>{
    return moment(date).format(format)
} 