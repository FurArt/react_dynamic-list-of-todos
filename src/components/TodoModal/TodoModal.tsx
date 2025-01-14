import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface TodoModalProps {
  todo: Todo;
  onClose: () => void;
}

export const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose }) => {
  const {
    id,
    title,
    userId,
    completed,
  } = todo;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId !== null) {
      getUser(userId)
        .then((fetchUser) => {
          setUser(fetchUser);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [userId]);

  const resetIdAndCloseModal = () => {
    onClose();
  };

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${id}`}
            </div>

            <button
              onClick={resetIdAndCloseModal}
              type="button"
              className="delete"
              data-cy="modal-close"
              aria-label="Close Modal"
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {title}
            </p>
            {completed ? (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-success">Done</strong>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            ) : (
              <p className="block" data-cy="modal-user">
                <strong className="has-text-danger">Planned</strong>
                {' by '}
                <a href={`mailto:${user?.email}`}>{user?.name}</a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
