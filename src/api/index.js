import * as article from './modules/article'
import * as comment from './modules/comment'
import * as heros from './modules/heros'
import * as link from './modules/link'
import * as qn from './modules/qn'
import * as tag from './modules/tag'
import * as user from './modules/user'
import * as book from './modules/book'

export default {
  ...article,
  ...comment,
  ...heros,
  ...link,
  ...qn,
  ...tag,
  ...user,
  ...book
}
