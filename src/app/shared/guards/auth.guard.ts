import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";



export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    } else {
        const currentUrl = router.url;
        router.navigate(['/login'], {
            queryParams: { returnUrl: currentUrl || '/home' }
        });
        return false;
    }
}
