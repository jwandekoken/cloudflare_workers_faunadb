import { Router, listen } from 'worktop'
import faunadb, { errors } from 'faunadb'
import { getFaunaError } from './utils'

const router = new Router()

const faunaClient = new faunadb.Client({
  //@ts-ignore
  secret: FAUNA_SECRET,
  domain: 'db.us.fauna.com',
})

const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Sum,
  Delete,
  Add,
  Select,
  Let,
  Var,
  Update,
} = faunadb.query

router.add('GET', '/', async (request, response) => {
  response.send(200, 'hello world')
})

router.add('POST', '/products', async (request, response) => {
  const reqBody = await request.body<{
    serialNumber: string
    title: string
    weightLbs: string
  }>()

  if (!reqBody) {
    return response.send(400, {
      code: 'Invalid parameters',
      description: 'Invalid parameters',
      status: '400',
    })
  }

  const { serialNumber, title, weightLbs } = reqBody

  try {
    const result = await faunaClient.query<{
      data: {
        serialNumber: string
        title: string
        weightLbs: string
        quantity: number
      }
      ref: {
        id: string
      }
      ts: string
    }>(
      Create(Collection('Products'), {
        data: {
          serialNumber,
          title,
          weightLbs,
          quantity: 0,
        },
      }),
    )

    console.log('### result: ', result)

    response.send(200, {
      productId: result.ref.id,
    })
  } catch (error) {
    const err = error as errors.FaunaHTTPError
    const faunaError = getFaunaError(err)
    response.send(faunaError.status, faunaError)
  }
})

router.add('GET', '/products/:productId', async (request, response) => {
  const productId = request.params.productId

  try {
    const result = await faunaClient.query(
      Get(Ref(Collection('Products'), productId)),
    )

    response.send(200, result)
  } catch (error) {
    const err = error as errors.FaunaHTTPError
    const faunaError = getFaunaError(err)
    response.send(faunaError.status, faunaError)
  }
})

router.add('DELETE', '/products/:productId', async (request, response) => {
  try {
    const productId = request.params.productId

    const result = await faunaClient.query(
      Delete(Ref(Collection('Products'), productId)),
    )

    response.send(200, result)
  } catch (error) {
    const err = error as errors.FaunaHTTPError
    const faunaError = getFaunaError(err)
    response.send(faunaError.status, faunaError)
  }
})

listen(router.run)
