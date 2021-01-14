import { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const USR_QUERY = gql`
	query messages($query: String!) {
		messages(query: $query) {
			from
			to
			body
	    }
	}
`;
const NEW_MSG = gql`
	mutation createMessage(
		$from: String!
		$to: String!
		$body: String!
	) {
		createMessage(
			data: {
				from: $from,
				to: $to,
				body: $body
			}
		) {
			from
			to
			body
		}
	}
`;
const USR_DELETE = gql`
	mutation deleteMessage($from: String!) {
		deleteMessage(from: $from) 
	}
`;
const USR_SUBSCRIBE = gql`
	subscription {
		message {
			mutation
			data {
				from
				to
				body
			}
		}
	}
`;

const useChat = (username, reciever, body) => {

	const { data, subscribeToMore } = useQuery(USR_QUERY, { 
		variables: { 
			query: username
		}
	})
	const [createMessage] = useMutation(NEW_MSG, {
		variables: {
			from: username,
			to: reciever,
			body: body
		}
	})
	const [deleteMessage] = useMutation(USR_DELETE, {
		variables: {
			from: username
		}
	})

	useEffect(() => {
		subscribeToMore({
			document: USR_SUBSCRIBE,
			updateQuery: (prev, { subscriptionData }) => {
				// console.log(prev)
				if (!subscriptionData.data) return prev
				console.log(subscriptionData)
				const notification = subscriptionData.data.message
				if ( notification.mutation === "DELETED" ) {
					const deleter = notification.data.from
					return {
						...prev,
						messages: prev.messages.filter( msg => msg.from !== deleter && msg.to !== deleter )
					}
				} else {
					return {
						...prev,
						messages: [notification.data, ...prev.messages] 
					}
				}
			}
		})
	}, [subscribeToMore])

	const sendMessage = (msg) => {
		createMessage(msg)
	}
	const clearMessages = () => {
		deleteMessage(username)
	}

	return {
		data,
		sendMessage,
		clearMessages
	}
}

export default useChat

