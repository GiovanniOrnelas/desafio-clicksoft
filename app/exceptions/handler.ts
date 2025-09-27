import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { Exception } from '@adonisjs/core/exceptions'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof Exception) {
      return ctx.response.status(error.status || 500).send({
        success: false,
        error: {
          message: error.message,
        },
      })
    }

    return ctx.response.status(500).send({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: this.debug
          ? (error as any).message
          : 'An unexpected error occurred, please try again later',
      },
    })
  }

  async report(error: unknown, ctx: HttpContext) {
    if (error instanceof Exception) {
      ctx.logger.warn(
        `[${error.code}] ${error.message} — ${ctx.request.method()} ${ctx.request.url()}`
      )
    } else {
      ctx.logger.error(
        {
          url: ctx.request.url(),
          method: ctx.request.method(),
          stack: (error as any)?.stack,
        },
        (error as any)?.message || 'Unexpected error'
      )
    }
    return super.report(error, ctx)
  }
}