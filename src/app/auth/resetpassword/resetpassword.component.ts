import { Component } from '@angular/core';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.css']
})
export class PasswordResetComponent {
    token: string = ''; // Set this value with the token obtained from the backend.
    newPassword: string = '';
    confirmPassword: string = '';

    resetPassword() {
        // Check if newPassword and confirmPassword match.
        if (this.newPassword !== this.confirmPassword) {
            // Display an error message to the user.
            console.error("Passwords do not match");
            return;
        }
    }
}
