// types/react-day-picker.d.ts
import 'react-day-picker';

declare module 'react-day-picker' {
  export interface CustomComponents {
    IconLeft?: React.ComponentType;
    IconRight?: React.ComponentType;
  }
}