import { gql } from 'apollo-angular';

const createRegisterMutation =gql`
                mutation CreateRegister($input: RegisterInput!){
                    register(input: $input)
                }
            `

export { createRegisterMutation };