/**
 * Console filter utility to hide Grammarly extension messages
 * 
 * This utility overrides the console methods to filter out messages
 * from the Grammarly extension that clutter the console.
 */

// Store original console methods
const originalConsoleLog = console.log;
const originalConsoleInfo = console.info;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

// Function to check if a message is from Grammarly
const isGrammarlyMessage = (args: any[]): boolean => {
  if (!args || args.length === 0) return false;
  
  const message = args.join(' ');
  return (
    message.includes('grm') ||
    message.includes('Grammarly') ||
    message.includes('DEFAULT.coreclients.dox.context') ||
    message.includes('lib.tracking.call.service') ||
    message.includes('lib.tracking') ||
    message.includes('universal.bg.iterable.service') ||
    message.includes('PageConfigLoaderImpl') ||
    message.includes('ClientControlsCacheImpl') ||
    message.includes('MetaDataServiceImpl') ||
    message.includes('DAPIService') ||
    message.includes('CDNBlocklistConfigSource') ||
    message.includes('gnar.pingMaybe') ||
    message.includes('tracking/RPC')
  );
};

// Override console methods with proper type definitions
const overrideConsole = () => {
  console.log = function(...args: any[]) {
    if (!isGrammarlyMessage(args)) {
      originalConsoleLog.apply(console, args);
    }
  };

  console.info = function(...args: any[]) {
    if (!isGrammarlyMessage(args)) {
      originalConsoleInfo.apply(console, args);
    }
  };

  console.warn = function(...args: any[]) {
    if (!isGrammarlyMessage(args)) {
      originalConsoleWarn.apply(console, args);
    }
  };

  console.error = function(...args: any[]) {
    if (!isGrammarlyMessage(args)) {
      originalConsoleError.apply(console, args);
    }
  };
};

// Initialize the console filter
overrideConsole();

// Export a function to restore original console methods if needed
export const restoreConsole = () => {
  console.log = originalConsoleLog;
  console.info = originalConsoleInfo;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
}; 