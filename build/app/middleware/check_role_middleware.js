export default function checkRole(allowedRoles) {
    return async ({ auth, response }, next) => {
        try {
            const user = await auth.use('api').authenticate();
            if (!allowedRoles.includes(user.role)) {
                return response.unauthorized({ message: 'Insufficient permissions' });
            }
            await next();
        }
        catch {
            return response.unauthorized({ message: 'Not authenticated' });
        }
    };
}
//# sourceMappingURL=check_role_middleware.js.map