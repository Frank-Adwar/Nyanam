/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Normalize path. If "/" or empty, default to "/fish"
  const getNormalizedPath = () => {
    const rawPath = window.location.pathname;
    if (rawPath === '/' || rawPath === '') return '/fish';
    return rawPath;
  };

  const [path, setPath] = useState<string>(getNormalizedPath());

  useEffect(() => {
    const handlePopState = () => {
      setPath(getNormalizedPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    // Standardize destination path
    const dest = to === '/' ? '/fish' : to;
    window.history.pushState(null, '', dest);
    setPath(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export const Link: React.FC<LinkProps> = ({ to, children, className, onClick, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
};
