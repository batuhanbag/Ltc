import React, { createContext, useContext, useState } from 'react';
import {
  initialize,
  requestPermission,
  readRecords,
} from 'react-native-health-connect';
import type { TimeRangeFilter } from 'react-native-health-connect/lib/typescript/types/base.types';
import { isAndroid } from '../utils';

export interface GoogleHealthData {
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
  googleHealthData: GoogleHealthData | undefined;
  requestPermissionsAndFetchData: () => Promise<boolean>;
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const GoogleHealthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [googleHealthData, setHealthData] = useState<GoogleHealthData>();

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

  const requestPermissionsAndFetchData = async (): Promise<boolean> => {
    if (!isAndroid) {
      console.log('Google Health is only available on Android');
      return false;
    }

    try {
      const isInitialized = await initialize();
      if (!isInitialized) {
        console.error('Failed to initialize Health Connect');
        return false;
      }

      const grantedPermissions = await requestPermission([
        { accessType: 'read', recordType: 'Steps' },
      ]);

      if (!grantedPermissions) {
        console.error('Permissions not granted');
        return false;
      }

      const { records } = await readRecords(
        'Steps',
        getYearlyStepDataOptions()
      );

      setHealthData({
        steps: records as Step[],
      });

      return true;
    } catch (error) {
      console.error(
        'Error initializing Health Connect or fetching data',
        error
      );
      return false;
    }
  };

  return (
    <HealthContext.Provider
      value={{ googleHealthData, requestPermissionsAndFetchData }}
    >
      {children}
    </HealthContext.Provider>
  );
};

const useGoogleHealthData = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error(
      'useGoogleHealthData must be used within a GoogleHealthProvider'
    );
  }
  return context;
};

export { GoogleHealthProvider, useGoogleHealthData };
