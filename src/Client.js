import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-client-preset';
import { ApolloClient } from 'apollo-client';

import { withClientState } from 'apollo-link-state';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import compose from 'recompose/compose';

const todoDefaults = {
    currentTodos: ['We got a todo!',],
};


// GraphQL stuff

export const todoQuery = gql`
    query getTodo {
        currentTodos @client
    }
`;

const clearTodoQuery = gql`
    mutation clearTodo {
        clearTodo @client
    }
`;

const addTodoQuery = gql`
    mutation addTodo($item: String) {
        addTodo(item: $item) @client
    }
`;

// Cache Mutations

const addTodo = (_obj, {item}, {cache}) => {
    const query = todoQuery;

    const { currentTodos } = cache.readQuery({query});
    const updatedTodos = currentTodos.concat(item);

    cache.writeQuery({query, data: {currentTodos: updatedTodos}});

    return null;
}

const clearTodo = (_obj, _args, {cache}) => {
    cache.writeQuery({ query: todoQuery, data: todoDefaults });
    return null;
}

const cache = new InMemoryCache();

const stateLink = withClientState({
    cache,
    defaults: todoDefaults,
    resolvers: {
        Mutation: {
            addTodo,
            clearTodo
        },
    },
});

const Client = new ApolloClient({
    link: ApolloLink.from([stateLink,]),
    cache: cache,
});

// Helper functions

const todoQueryHandler = {
    props: ({ ownProps, data: {currentTodos = []}}) => ({
        ...ownProps,
        currentTodos,
    }),
};

const withTodo = compose(
    graphql(todoQuery, todoQueryHandler),
    graphql(addTodoQuery, { name: 'addTodoMutation' }),
    graphql(clearTodoQuery, { name: 'clearTodoMutation' }),
);

export {Client, withTodo};
