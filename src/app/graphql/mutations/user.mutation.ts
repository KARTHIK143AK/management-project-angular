import { gql } from 'apollo-angular';

const validateUserDetailsMutation =gql`
            mutation Login($email: String!, $password: String!) {
                validateUsers(email: $email, password: $password){
                    success
                    message
                }
            }
            `

export { validateUserDetailsMutation };