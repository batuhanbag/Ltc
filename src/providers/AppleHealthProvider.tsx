/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, {
  type HealthPermission,
  type HealthInputOptions,
  type HealthKitPermissions,
} from 'react-native-health';

const isIOS = Platform.OS === 'ios';

type HealthData = {
  steps?: number;
  walkDistance?: number;
};

type HealthContextType = {
  healthData: HealthData;
};

const HealthContext = createContext<HealthContextType | undefined>(undefined);

const { Permissions } = AppleHealthKit.Constants;

const generatePermissions = (
  readPermissions: HealthPermission[],
  writePermissions: HealthPermission[]
): HealthKitPermissions => {
  return {
    permissions: {
      read: readPermissions || [],
      write: writePermissions || [],
    },
  };
};

const AppleHealthProvider: React.FC<{
  children: React.ReactNode;
  healthOptions: HealthInputOptions;
  readPermissions: HealthPermission[];
  writePermissions: HealthPermission[];
}> = ({ children, healthOptions, readPermissions, writePermissions }) => {
  const [hasPermissions, setHasPermission] = useState<boolean>(false);
  const [healthData, setHealthData] = useState<HealthData>({});

  useEffect(() => {
    if (!isIOS) {
      console.log('Not an iOS device');
      return;
    }

    AppleHealthKit.initHealthKit(
      generatePermissions(readPermissions, writePermissions),
      (err) => {
        if (err) {
          console.error(
            'Error initializing HealthKit and getting permissions',
            err
          );
          return;
        }
        setHasPermission(true);
      }
    );
  }, []);

  useEffect(() => {
    if (!hasPermissions) {
      console.log('No permissions to fetch health data');
      return;
    }

    const options: HealthInputOptions = healthOptions;

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.error('Error getting the walking/running distance', err);
        return;
      }
      setHealthData((prev) => ({
        ...prev,
        walkDistance: results.value,
      }));
    });
  }, [hasPermissions]);

  return (
    <HealthContext.Provider value={{ healthData }}>
      {children}
    </HealthContext.Provider>
  );
};

const useHealthData = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealthData must be used within a HealthProvider');
  }
  return context;
};

export { AppleHealthProvider, useHealthData, Permissions };
