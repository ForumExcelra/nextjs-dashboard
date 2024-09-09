import { useEffect, useState } from 'react';

const useRDKit = () => {
  const [RDKit, setRDKit] = useState(null);

  useEffect(() => {
    const loadRDKit = async () => {
      if (!window.initRDKitModule) {
        console.error('RDKit.js module initialization function not found.');
        return;
      }

      try {
        const rdkitModule = await window.initRDKitModule();
        setRDKit(rdkitModule);
      } catch (error) {
        console.error('Failed to load RDKit.js:', error);
      }
    };

    loadRDKit();
  }, []);

  return RDKit;
};

export default useRDKit;
