import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { GetRegisterQuery } from '@graphql/queries/register.queries';
import { createRegisterMutation } from '@graphql/mutations/register.mutation';

@Injectable({
    providedIn: 'root' // 🔹 singleton app-wide
})
export class InternalGoService {
    constructor(private apolloProvider: Apollo,) {

    }
    getRegistrations() {
        return this.apolloProvider.watchQuery<any>({
            fetchPolicy: 'network-only',
            query: GetRegisterQuery,
        }).valueChanges;
    }


    register(payload: any) {
        return this.apolloProvider.mutate({
            mutation: createRegisterMutation,
            variables: { input: payload }
        }).subscribe({
            next: res => {
                console.log(res);
            },
            error: err => console.error('❌ GraphQL error:', err),
        });
    }
}