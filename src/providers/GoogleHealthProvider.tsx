import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import type { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
import { isAndroid } from '../utils';

export interface HealthData {
  steps: Step[];
}

export interface Step {
  metadata: Metadata;
  count: number;
  endTime: string;
  startTime: string;
}

export interface Metadata {
  recordingMethod: number;
  device: Device;
  clientRecordVersion: number;
  dataOrigin: string;
  clientRecordId: any;
  lastModifiedTime: string;
  id: string;
}

export interface Device {
  model: any;
  manufacturer: any;
  type: number;
}

type HealthContextType = {
  googleHealthData: HealthData | undefined;
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const GoogleHealthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasPermissions, setHasPermission] = useState<boolean>(false);
  const [googleHealthData, setHealthData] = useState<HealthData>();

  const getYearlyStepDataOptions = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setFullYear(endDate.getFullYear() - 1);

    return {
      timeRangeFilter: {
        operator: 'between',
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
      } as TimeRangeFilter,
    };
  };

  useEffect(() => {
    if (!isAndroid) {
      console.log('Google Health is only available on Android');
      return;
    }

    const initializeHealthConnect = async () => {
      try {
        const isInitialized = await initialize();
        if (!isInitialized) {
          console.error('Failed to initialize Health Connect');
          return;
        }

        const grantedPermissions = await requestPermission([
          { accessType: 'read', recordType: 'Steps' },
        ]);

        if (!grantedPermissions) {
          console.error('Permissions not granted');
          return;
        }

        setHasPermission(true);
      } catch (error) {
        console.error('Error initializing Health Connect', error);
      }
    };

    initializeHealthConnect();
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      console.log('No permissions to fetch health data');
      return;
    }

    const fetchHealthData = async () => {
      try {
        const { records } = await readRecords(
          'Steps',
          getYearlyStepDataOptions()
        );

        setHealthData({
          steps: records as Step[],
        });
      } catch (error) {
        console.error('Error fetching health data', error);
      }
    };

    fetchHealthData();
  }, [hasPermissions]);

  return (
    <HealthContext.Provider value={{ googleHealthData }}>
      {children}
    </HealthContext.Provider>
  );
};

const useGoogleHealthData = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a GoogleHealthProvider');
  }
  return context;
};

export { GoogleHealthProvider, useGoogleHealthData };
