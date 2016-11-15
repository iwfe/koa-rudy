import hotMiddleware from 'webpack-hot-middleware'
import { PassThrough } from 'stream'

module.exports = function(compiler, opts) {
  const expressMiddleware = hotMiddleware(compiler, opts)
  return async (ctx, next) => {
    let stream = new PassThrough()
    ctx.body = stream
    await expressMiddleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (state, headers) => {
        ctx.state = state
        ctx.set(headers)
      }
    }, next)
  }
}
