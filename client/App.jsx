import React, { createContext, useEffect, useState } from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainStack from "./src/components/AppNavigator";
import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font'

import UserStore from './src/store/userStore';
import TasksStore from './src/store/tasksStore';
import CompanyStore from './src/store/companyStore';
import ReportsStore from './src/store/reportsStore';

export const Context = createContext(null);

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Assistant-VariableFont_wght': require('./assets/fonts/Assistant/Assistant-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    };
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Context.Provider // Компонент React из объекта контекста, который позволяет другим компонентам приложения получать доступ к значениям контекста и подписываться на их изменения.
      value={{
        user: new UserStore(),
        tasks: new TasksStore(),
        company: new CompanyStore(),
        reports: new ReportsStore(),
      }}
    >
      <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />
      <SafeAreaProvider>
        <MainStack/>
      </SafeAreaProvider>
    </Context.Provider>
  );
}

export default App;
