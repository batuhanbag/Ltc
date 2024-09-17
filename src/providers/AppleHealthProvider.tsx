/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState } from 'react';
import { Platform } from 'react-native';
import AppleHealthKit, {
  type HealthPermission,
  type HealthInputOptions,
  type HealthKitPermissions,
} from 'react-native-health';

const isIOS = Platform.OS === 'ios';

export type HealthData = {
  steps?: number;
  walkDistance?: number;
};

type HealthContextType = {
  healthData: HealthData;
  requestPermissionsAndFetchData: () => Promise<boolean>;
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
  const [healthData, setHealthData] = useState<HealthData>({});

  const requestHealthPermissions = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      AppleHealthKit.initHealthKit(
        generatePermissions(readPermissions, writePermissions),
        (err) => {
          if (err) {
            console.error(
              'HealthKit başlatılırken ve izinler alınırken hata oluştu',
              err
            );
            resolve(false);
          } else {
            resolve(true);
          }
        }
      );
    });
  };

  const fetchHealthData = () => {
    const options: HealthInputOptions = healthOptions;

    AppleHealthKit.getStepCount(options, (err: any, results: any) => {
      if (err) {
        console.error('Adım sayısı alınırken hata oluştu', err);
        return;
      }
      setHealthData((prev) => ({
        ...prev,
        steps: results.value,
      }));
    });

    AppleHealthKit.getDistanceWalkingRunning(
      options,
      (err: any, results: any) => {
        if (err) {
          console.error('Yürüme/koşma mesafesi alınırken hata oluştu', err);
          return;
        }
        setHealthData((prev) => ({
          ...prev,
          walkDistance: results.value,
        }));
      }
    );
  };

  const requestPermissionsAndFetchData = async (): Promise<boolean> => {
    if (!isIOS) {
      console.log('iOS cihazı değil');
      return false;
    }

    const permissionsGranted = await requestHealthPermissions();
    if (permissionsGranted) {
      fetchHealthData();
      return true;
    }
    return false;
  };

  return (
    <HealthContext.Provider
      value={{ healthData, requestPermissionsAndFetchData }}
    >
      {children}
    </HealthContext.Provider>
  );
};

const useHealthData = () => {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealthData bir HealthProvider içinde kullanılmalıdır');
  }
  return context;
};

export { AppleHealthProvider, useHealthData, Permissions };
