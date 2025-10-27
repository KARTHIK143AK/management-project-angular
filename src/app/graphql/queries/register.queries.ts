import { gql } from 'apollo-angular';

const GetRegisterQuery = gql`
            query {
                registrations {
                    name
                    userDetails {
                        location
                        state
                        country
                        pincode
                        phoneNumber
                    }
                }
            }
            `

export { GetRegisterQuery };