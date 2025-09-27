import { defineConfig } from '@adonisjs/auth';
import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens';
const authConfig = defineConfig({
    default: 'api',
    guards: {
        api: tokensGuard({
            provider: tokensUserProvider({
                model: () => import('#models/user'),
                tokens: 'accessTokens',
            }),
        }),
    },
});
export default authConfig;
//# sourceMappingURL=auth.js.map