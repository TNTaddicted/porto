import { useEffect } from 'react';

const CursorEffects = () => {
  useEffect(() => {
    // Re-enable default cursor in case it was hidden by CSS
    document.body.style.cursor = 'auto';
  }, []);

  return null; // Nothing renders
};

export default CursorEffects;
