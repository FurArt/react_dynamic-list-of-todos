import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <table className="table is-narrow is-fullwidth">
    <thead>
      <tr>
        <th>#</th>
        <th>
          <span className="icon">
            <i className="fas fa-check" />
          </span>
        </th>
        <th>Title</th>
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>
);
