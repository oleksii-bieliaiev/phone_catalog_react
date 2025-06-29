/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import './Loader.scss';

export const Loader: React.FC = () => {
  const { theme } = useContext(GlobalContext);
  const spinnerColor = theme === 'light' ? 'var(--color-accent)' : 'var(--color-accent-dark)';

  return (
    <div className="loader">
      <div
        className="loader__spinner"
        style={{ borderTopColor: spinnerColor, width: '150px', height: '150px' }}
      />
    </div>
  );
};
