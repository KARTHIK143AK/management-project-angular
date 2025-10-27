import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { validateUserDetailsMutation } from '@graphql/mutations/user.mutation';

@Injectable({
    providedIn: 'root' // 🔹 singleton app-wide
})
export class AuthGoService {

    constructor(private apolloProvider: Apollo,) {

    }

    validateLoginDetails(email: any, password: any) {
        console.log('Validating login details via GraphQL mutation');
        return this.apolloProvider.mutate({
            mutation: validateUserDetailsMutation,
            variables: { email: email, password: password }
        })
    }
    async login(email: string, password: string): Promise<boolean> {
        // Replace this fake logic with real API call later
        if (email === 'admin@test.com' && password === 'admin') {
            return true;
        }
        return false;
    }

}