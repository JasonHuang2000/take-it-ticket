import { gql } from 'apollo-boost'

export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $name: String!
        $userid: String!
        $password: String!
    ) {
        createUser(
            data: {
                name: $name
                userid: $userid
                password: $password
            }
        ) {
            name
            userid
            password
            history {
                trainNum
                seat {
                    carriage
                    seatNum
                    available
                }
            }
        }
    }
`

export const CREATE_SHIFT_MUTATION = gql`
    mutation createShift(
        $trainNum: Int!
        $year: Int!
        $month: Int!
        $day: Int!
        $hourd: Int!
        $minuted: Int!
        $houra: Int!
        $minutea: Int!
        $departure: String
        $arrival: String
    ) {
        createShift (
            data: {
                trainNum: $trainNum
                schedule: {
                    date: {
                        year: $year
                        month: $month
                        day: $day
                    }
                    arrive: {
                        hour: $hourd
                        minute: $minuted
                    }
                    depart: {
                        hour: $houra
                        minute: $minutea
                    }
                }
                departure: $departure
                arrival: $arrival
        }) {
            trainNum
            schedule {
                date {
                    year
                    month
                    day
                }
                depart {
                    hour
                    minute
                }
                arrive {
                    hour
                    minute
                }
            }
            departure
            arrival
            seats {
                carriage
                seatNum
                available
            }
        }
    }
`

export const UPDATE_SEAT_MUTATION = gql`
    mutation updateSeat(
        $trainNum: Int
        $carriage: Int
        $seatNum: Int
        $available: Int
    ) {
        updateSeat(
            data: {
                trainNum: $trainNum
                carriage: $carriage
                seatNum: $seatNum
                available: $available
        }) {
            carriage
            seatNum
            available
        }
    }
`

export const UPDATE_RECORD_MUTATION = gql`
    mutation updateRecord(
        $userid: String
        $trainNum: Int
        $carriage: Int
        $seatNum: Int
        $available: Boolean
    ) {
        updateRecord(
            data: {
                userid: $userid
                trainNum: $trainNum
                carriage: $carriage
                seatNum: $seatNum
                available: $available
        }) {
            name
            userid
            password
            history {
                trainNum
                seat {
                    carriage
                    seatNum
                    available
                }
            }
        }
    }
`

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser($id: String!) {
        deleteUser(id: $id) {
            name
            userid
            password
            history {
                trainNum
                seat {
                    carriage
                    seatNum
                    available
                }
            }
        }
    }
`

export const DELETE_SHIFT_MUTATION = gql`
    mutation deleteShift($id: String!) {
        deleteUser(id: $id) {
            trainNum
            schedule {
                date {
                    year
                    month
                    day
                }
                depart {
                    hour
                    minute
                }
                arrive {
                    hour
                    minute
                }
            }
            departure
            arrival
            seats {
                carriage
                seatNum
                available
            }
        }
    }
`