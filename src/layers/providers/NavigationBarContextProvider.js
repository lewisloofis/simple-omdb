import * as React from 'react';

const SearchedValueContext = React.createContext('');
const SetSearchedValueContext = React.createContext(() => {});

/**
 * Context provider for navigation bar data
 * @returns React component
 */
export const NavigationBarContextProvider = ({ children }) => {
  /**
   * We are storing search input value in these variable
   */
  const [searchedValue, setSearchedValue] = React.useState('');

  return (
    <SearchedValueContext.Provider value={searchedValue}>
      <SetSearchedValueContext.Provider value={setSearchedValue}>
        {children}
      </SetSearchedValueContext.Provider>
    </SearchedValueContext.Provider>
  );
};

/**
 * Export navigation bar data
 */
export const useNavigationBarData = () => {
  const searchedValue = React.useContext(SearchedValueContext);
  const setSearchedValue = React.useContext(SetSearchedValueContext);

  if (searchedValue === undefined) throw new Error('useNavigationBarData must be used inside <NavigationBarContextProvider />');

  return {
    searchedValue,
    setSearchedValue,
  };
};

export default NavigationBarContextProvider;
