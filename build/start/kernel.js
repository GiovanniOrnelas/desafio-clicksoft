import router from '@adonisjs/core/services/router';
import server from '@adonisjs/core/services/server';
server.errorHandler(() => import('#exceptions/handler'));
server.use([
    () => import('#middleware/container_bindings_middleware'),
    () => import('#middleware/force_json_response_middleware'),
    () => import('@adonisjs/cors/cors_middleware'),
]);
router.use([() => import('@adonisjs/core/bodyparser_middleware'), () => import('@adonisjs/auth/initialize_auth_middleware')]);
const check_role_middleware = '#middleware/check_role_middleware';
export const middleware = router.named({
    checkRole: () => import(check_role_middleware),
    auth: () => import('#middleware/auth_middleware')
});
//# sourceMappingURL=kernel.js.map