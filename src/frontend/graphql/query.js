import { gql } from 'apollo-boost'

export const ALLSHIFT_QUERY = gql`
    query allShift {
        allShift {
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

export const SHIFT_QUERY = gql`
    query shift(
        # $date: {
            $year: Int!
            $month: Int!
            $day: Int!
        # }
        # $time: {
            $hour: Int!
            $minute: Int!
        # }
        $departure: String!
        $arrival: String!
    ) {
        shift (query: {
            date: {
                year: $year
                month: $month
                day: $day
            }
            time: {
                hour: $hour
                minute: $minute
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

export const FINDSEAT_QUERY = gql`
    query findSeat(
        $trainNum: Int!
        $carriage: Int!
        $seatNum: Int!
    ) {
        findSeat (query: {
            trainNum: $trainNum
            carriage: $carriage
            seatNum: $seatNum
        }) {
            carriage
            seatNum
            available
        }
    }
`

export const ALLUSER_QUERY = gql`
    query allUser {
        allUser {
            name
            userid
            password
            history {
                total
                trainNum
                seats {
                    carriage
                    seatNum
                    available
                }
            }
        }
    }
`

export const USER_QUERY = gql`
    query user($id: String!) {
        user (id: $id) {
            name
            userid
            password
            history {
                total
                trainNum
                seats {
                    carriage
                    seatNum
                    available
                }
            }
        }
    }
`