import React from 'react';
import { Query } from 'react-apollo';
import { todoQuery } from './Client';

class TodoNotSoPure extends React.Component {
    render() {
        return(
            <div>
                <Query query = {todoQuery}>
                    {response => {
                        if(response.loading) {
                            return <div>Loading...</div>;
                        }
                        else if(response.error) {
                            return <div>Error! {JSON.stringify(response.error)}</div>
                        }
                        return (
                            response.data.currentTodos.map((todo)=>(todo))
                        );

                    }}
                </Query>
            </div>
        );
    }
}

export default TodoNotSoPure;
